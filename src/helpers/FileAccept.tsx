import { members, parseDirectIdJSON } from "./Parsers";
import Ws from "./WebSocket";

export default class FileAccept {
  static instance = new FileAccept();

  constructor(private container: Array<string> = new Array()) {
    Ws.instance.add(members, (members) => {
      this.container = this.container.filter((id) => members.ids.includes(id));
    });
  }

  public allow(id: string) {
    this.container.push(id);
    console.log("container of accepted ids: ", this.container);
  }
}
