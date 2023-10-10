
export enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSE = 2,
}

export default class Notifications {

  static instance = new Notifications();

  constructor(
    private _ws = new WebSocket(`ws://127.0.0.1:8080/ws`),
    public state = ReadyState.CONNECTING,
    private _listener: Array<(state: ReadyState) => void> = new Array()
  ) {
    this._ws.onopen = () => {
      this.state = ReadyState.OPEN;
      _listener.forEach(x => x(this.state));
    };
    this._ws.onclose = () => {
      this.state = ReadyState.CLOSE;
      _listener.forEach(x => x(this.state));
    };
    this._ws.onerror = () => {
      this.state = ReadyState.UNINSTANTIATED;
      _listener.forEach(x => x(this.state));
    }
  }

  public add(fn: (event: MessageEvent<any>) => void) {
    this._ws.addEventListener("message", fn);
  }

  public addStateListener(listener: (state: ReadyState) => void) {
    this._listener.push(listener);
  }

  public sendMessage(body: string) {
    this._ws.send(body);
  }
}
