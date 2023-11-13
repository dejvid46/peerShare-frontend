import { sendDirectObj } from "./WebRTCContainer";
import Ws from "./WebSocket";
import DataChannel from "./DataChannel";

export default class WebRTC {
  constructor(
    public id: string,
    private offer?: RTCSessionDescriptionInit | undefined,
    public rtc: RTCPeerConnection = new RTCPeerConnection(),
    private dc: DataChannel = new DataChannel(rtc, offer ? false : true),
  ) {
    this.rtc.addEventListener("icecandidate", async event => {
      Ws.instance.sendMessage(sendDirectObj("icecandidate", this.id, event.candidate));
    });

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
        .then(() => {
          Ws.instance.sendMessage(sendDirectObj("answer", this.id, this.rtc.localDescription));
        });
    }
  }

  public disconnect() {
    this.dc.close();
    this.rtc.close();
  }

  public sendFiles(files: Array<File>){
    const mess = files.map(x => x.name).join(" ");

    this.dc.send(mess);
  }
}