import { sendDirectObj } from "./WebRTCContainer";
import Ws from "../ws/WebSocket";
import DataChannel from "./DataChannel";
import { FileConfig } from "../File";

export default class WebRTC {
  constructor(
    public id_to: string,
    public id_from: string,
    private offer?: RTCSessionDescriptionInit | undefined,
    public rtc: RTCPeerConnection = new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:stun1.l.google.com:19302' }] }),
    private dc: DataChannel = new DataChannel(id_to, rtc, offer ? false : true),
  ) {
    this.rtc.addEventListener("icecandidate", async event => {
      console.log("sending IceCandidate", event.candidate);
      Ws.instance.sendMessage(sendDirectObj("icecandidate", this.id_to, event.candidate));
    });

    if(!this.offer){
      this.rtc.createOffer()
        .then(offer => this.rtc.setLocalDescription(new RTCSessionDescription(offer)))
        .then(() => {
          Ws.instance.sendMessage(sendDirectObj("offer", this.id_to, this.rtc.localDescription));
        });
    }else{
      this.rtc.setRemoteDescription(this.offer);
      this.rtc.createAnswer()
        .then(answer => this.rtc.setLocalDescription(new RTCSessionDescription(answer)))
        .then(() => {
          Ws.instance.sendMessage(sendDirectObj("answer", this.id_to, this.rtc.localDescription));
        });
    }
  }

  public disconnect() {
    this.dc.close();
    this.rtc.close();
  }

  public sendFiles(files: Array<File>){
    files.forEach(file => {
      this.sendData(file);
    })
  }

  private sendData(file: File) {
    this.dc.send((dc) => {
      FileConfig.Send({
        file: file,
        channel: dc,
        interval: 5,
        id_from: this.id_from,
        id_to: this.id_to,
        chunkSize: 64000,
        onBegin: (file) => {
        },
        onEnd: (file) => {
        },
        onProgress: (file) => {
        },
    });
    });
  }
}