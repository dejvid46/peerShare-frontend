import WebRTC from "./WebRTC";
import Ws from "../ws/WebSocket";
import { JsonStructiure, parseDirectIdJSON } from "../Parsers";
import { err, ok, type Result } from "../Result";
import type { Err } from "../ws/UseWebSocket";
import { members as membersParser } from "../Parsers";

export default class WebRTCContainer {

  static instance = new WebRTCContainer();

  constructor(
    private _WebRTCs: Map<string, WebRTC> = new Map(),
    private _Listeners: Map<string, Array<() => void>> = new Map(),
    public id_from: string | undefined = undefined
  ) {
    Ws.instance.add(parseDirectIdJSON, this.listener());

    Ws.instance.add(membersParser, (members) => {
      this._WebRTCs.forEach(webrtc => {
        !members.ids.includes(webrtc.id_to) && this.delete(webrtc);
      });
    });
  }

  public registerListener(id: string, f: () => void){
    const listeners = this._Listeners.get(id)
    if (listeners) {
      listeners.push(f);
    }else{
      this._Listeners.set(id, [f]);
    }
  }

  private listener() {
    const WebRTCs = this._WebRTCs;
    return (res: JsonStructiure) => {
      let webrtc = WebRTCs.get(res.id);
      if(!webrtc && res.type === "offer") {
        this.register(res.id, res.json);
      };
      if(!webrtc) return;
      if (res.type === "icecandidate") {
        if (!res.json) return;
        webrtc.rtc.addIceCandidate(res.json);
      }
      if (res.type === "answer") {
        if (!res.json) return;
        webrtc.rtc.setRemoteDescription(res.json);
      }
    }
  }

  public register(id: string, offer?: RTCSessionDescriptionInit): Result<WebRTC, Err> {
    if (this._WebRTCs.has(id)) return err({message: "already"});
    const webRTC = new WebRTC(id, this.id_from || "", offer);
    this._WebRTCs.set(id, webRTC);
    return ok(webRTC);
  }

  public sendFiles(id: string, files: Array<File>) {
    const webRTC = this._WebRTCs.get(id);
    if (!webRTC){
      return;
    }
    webRTC.sendFiles(files);
  }

  public delete(webrtc: WebRTC){
    webrtc.disconnect();
    this._Listeners.delete(webrtc.id_to);
    this._WebRTCs.delete(webrtc.id_to);
  }
}

export function sendDirectObj(type: string, id: string, obj: any){
  return `/direct_message ${id} ${type} ${JSON.stringify(obj)}`;
}