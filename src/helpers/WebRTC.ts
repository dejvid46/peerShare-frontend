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
    //const mess = files.map(x => x.name).join(" ");

    //this.dc.send(mess);

    this.sendData(files[0]);
  }

  private sendData(file: File) {
    console.log(`File is ${[file.name, file.size, file.type, file.lastModified].join(' ')}`);
  
    if (file.size === 0) {
      this.disconnect();
      return;
    }
    const chunkSize = 16384;
    const fileReader = new FileReader();
    let offset = 0;
    fileReader.addEventListener('error', error => console.error('Error reading file:', error));
    fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));
    fileReader.addEventListener('load', (e: any) => {
      console.log('FileRead.onload ', e);
      this.dc.send(e.target.result);
      offset += e.target.result.byteLength;
      if (offset < file.size) {
        readSlice(offset);
      }else{
        this.dc.send("Done!")
      }
    });
    const readSlice = (o: any) => {
      console.log('readSlice ', o);
      const slice = file.slice(offset, o + chunkSize);
      fileReader.readAsArrayBuffer(slice);
    };
    readSlice(0);
  }
}