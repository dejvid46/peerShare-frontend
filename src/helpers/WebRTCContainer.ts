import WebRTC from "./WebRTC";
import Ws from "./WebSocket";
import { JsonStructiure, parseDirectIdJSON } from "./Parsers";

export default class WebRTCContainer {

  static instance = new WebRTCContainer();

  constructor(
    private _WebRTCs: Map<string, WebRTC> = new Map(),
  ) {
    Ws.instance.add(parseDirectIdJSON, this.listener());
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

  public register(id: string, offer?: RTCSessionDescriptionInit) {
    const webrtc = new WebRTC(id, offer);
    webrtc.rtc.addEventListener("icecandidate", async event => {
      Ws.instance.sendMessage(sendDirectObj("icecandidate", id, event.candidate));
    });
    this._WebRTCs.set(id, webrtc);
  }

  public delete(id: string){
    this._WebRTCs.delete(id);
  }
}

export function sendDirectObj(type: string, id: string, obj: any){
  return `/direct_message ${id} ${type} ${JSON.stringify(obj)}`;
}