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
  ) {
    Ws.instance.add(parseDirectIdJSON, this.listener());

    Ws.instance.add(membersParser, (members) => {
      this._WebRTCs.forEach(webrtc => {
        !members.ids.includes(webrtc.id) && this.delete(webrtc);
      });
    });
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
    const webRTC = new WebRTC(id, offer);
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
    this._WebRTCs.delete(webrtc.id);
  }
}

export function sendDirectObj(type: string, id: string, obj: any){
  return `/direct_message ${id} ${type} ${JSON.stringify(obj)}`;
}