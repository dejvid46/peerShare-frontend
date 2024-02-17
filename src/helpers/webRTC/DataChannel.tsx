import { FileConfig } from "../File";
import FileContainer from "../FileContainer";

export default class DataChannel {
  constructor(
    private id: string,
    private rtc: RTCPeerConnection,
    private create: boolean,
    private dc: RTCDataChannel | undefined = (create &&
      rtc.createDataChannel("sendDataChannel", { ordered: true })) ||
      undefined,
    private holder: Array<(dc: RTCDataChannel) => void> = []
  ) {
    !this.create &&
      this.rtc.addEventListener("datachannel", (event) => {
        this.dc = event.channel;
        this.config(event.channel);
      });

    dc && this.config(dc);
  }

  private config(dc: RTCDataChannel) {
    dc.binaryType = "arraybuffer";

    var fleReceiver = FileConfig.Receiver({
      onBegin: (file) => {
        FileContainer.instance.registerFile(file.uuid, file.id_from, file.id_to, file.name, file.maxChunks, file.lastModifiedDate, file.size, file.type);
      },
      onEnd: (file) => {
        FileContainer.instance.finishFile(file.uuid, file.file, file.url);
      },
      onProgress: (file) => {
        FileContainer.instance.updateFile(file.uuid, file.currentPosition)
      },
    });
    dc.onmessage = function (data) {
        fleReceiver.receive(data);
    };

    dc.addEventListener("open", (event) => {
      this.holder.forEach((x) => x(dc));
    });
  }

  public close() {
    this.dc && this.dc.close();
  }

  public send(f: (dc: RTCDataChannel) => void) {
    (this.dc && this.dc.readyState === "open" && f(this.dc)) ||
      this.holder.push(f);
  }
}
