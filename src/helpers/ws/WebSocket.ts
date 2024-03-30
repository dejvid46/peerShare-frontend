import type { Result } from "../Result";
import type { Err } from "./UseWebSocket";

export enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSE = 2,
}

interface Cache<T> {
  listeners: Array<(data: T) => void>
  cache: T | undefined
}

export default class Ws {

  static instance = new Ws();

  constructor(
    private _ws = new WebSocket(import.meta.env.PUBLIC_SW),
    public state = ReadyState.CONNECTING,
    private _listener: Array<(state: ReadyState) => void> = new Array(),
    private _parserCache: Map<(body: string) => Result<any, Err>, Cache<any>> = new Map(),
  ) {
    this._ws.onopen = () => {
      this.state = ReadyState.OPEN;
      this._listener.forEach(x => x(this.state));
    };
    this._ws.onclose = () => {
      if (this.state != -1) {
        this.state = ReadyState.CLOSE;
        this._listener.forEach(x => x(this.state)); 
      }
    };
    this._ws.onerror = () => {
      this.state = ReadyState.UNINSTANTIATED;
      this._listener.forEach(x => x(this.state));
    }
  }

  public add<T>(parser: (body: string) => Result<T, Err>, listener: (data: T) => void) {
    const cache = this._parserCache.get(parser);
    if(cache){
      this._parserCache.set(parser, {cache: cache.cache, listeners: [...cache.listeners, listener]});
    }else{
      this._parserCache.set(parser, {cache: undefined, listeners: [listener]});

      this._ws.addEventListener("message", (e: MessageEvent<string>) => {
        const res = parser(e.data);
        if (res.ok) {
          const cache = this._parserCache.get(parser);
          if (cache) {
            this._parserCache.set(parser, {cache: res.value, listeners: cache.listeners});
            cache.listeners.forEach(listener => listener(res.value));
          }
        }else{
          //console.error({mess: res.error, send: mess});
        }
      });
    }
  }

  public getCache<T>(parser: (body: string) => Result<T, Err>){
    return this._parserCache.get(parser)?.cache;
  }

  public addStateListener(listener: (state: ReadyState) => void) {
    this._listener.push(listener);
  }

  public sendMessage(body: string) {
    this._ws.send(body);
  }

  public getState() {
    return this.state;
  }
}