export default class DataChannel {
  constructor(
    private rtc: RTCPeerConnection,
    private create: boolean,
    private dc: RTCDataChannel | undefined = (create &&
      rtc.createDataChannel("sendDataChannel", { ordered: true })) ||
      undefined,
    private holder: Array<string> = []
  ) {
    !this.create &&
      this.rtc.addEventListener("datachannel", (event) => {
        this.dc = event.channel;
        this.config(event.channel);
      });

    dc && this.config(dc);
  }

  private config(dc: RTCDataChannel) {
    console.log("new WebRTC", this.create ? "local" : "remote");
    dc.binaryType = "arraybuffer";
    let receiveBuffer: any[] = [];
    let receivedSize;
    dc.addEventListener(
      "message",
      this.onReceiveMessageCallback(receiveBuffer, receivedSize)
    );
    dc.addEventListener("open", (event) => {
      this.holder.forEach((x) => dc.send(x));
    });
  }

  private onReceiveMessageCallback(receiveBuffer: any[], receivedSize: any) {
    return (e: any) => {
      console.log(`Received Message ${e.data.byteLength}`);
      receiveBuffer.push(e.data);
      receivedSize += e.data.byteLength;

      if (e.data === "Done!") {
        const received = new Blob(receiveBuffer);
        console.log(received);
      }
    };
  }

  public close() {
    this.dc && this.dc.close();
  }

  public send(mess: string) {
    (this.dc && this.dc.readyState === "open" && this.dc.send(mess)) ||
      this.holder.push(mess);
  }
}
