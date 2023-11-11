import { sendDirectObj } from "./WebRTCContainer";
import Ws from "./WebSocket";

export default class WebRTC {
  constructor(
    private id: string, 
    private offer?: RTCSessionDescriptionInit | undefined,
    public rtc: RTCPeerConnection = new RTCPeerConnection(),
  ) {
    this.rtc.createDataChannel('sendDataChannel');
    if(!this.offer){
      this.rtc.createOffer()
        .then(offer => this.rtc.setLocalDescription(new RTCSessionDescription(offer)))
        .then(() => {
          Ws.instance.sendMessage(sendDirectObj("offer", this.id, this.rtc.localDescription));
        });
    }else{
      this.rtc.setRemoteDescription(this.offer);
      this.rtc.createAnswer()
        .then(answer => this.rtc.setLocalDescription(new RTCSessionDescription(answer)))
        .then(() => (Ws.instance.sendMessage(sendDirectObj("answer", this.id, this.rtc.localDescription))));
    }
  }

}