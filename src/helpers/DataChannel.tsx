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
    dc.addEventListener("message", (event) => {
      console.log(event.data);
    });
    dc.addEventListener("open", (event) => {
      this.holder.forEach((x) => dc.send(x));
    });
  }

  public close() {
    this.dc && this.dc.close();
  }

  public send(mess: string) {
    (this.dc && this.dc.readyState === "open" && this.dc.send(mess)) ||
      this.holder.push(mess);
  }
}
