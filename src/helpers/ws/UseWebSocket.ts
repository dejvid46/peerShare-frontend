import { useState, useEffect } from "react";
import Ws, { ReadyState } from "./WebSocket";
import type { Result } from "../Result";

export interface Err {
  message: string
}

export default function useWebSocket<T>(parse?: (body: string) => Result<T, Err>, mess?: string) {
  const [lastMess, setLastMess] = useState<T | undefined>(parse && Ws.instance.getCache(parse) || undefined);
  const [state, setState] = useState<ReadyState>(Ws.instance.state);

  useEffect(() => {
    parse && Ws.instance.add(parse, (data) => setLastMess(data));
    
    Ws.instance.addStateListener((state) => {
      setState(state);
    })
    parse && (Ws.instance.getCache(parse) !== lastMess && setLastMess(Ws.instance.getCache(parse)))
    Ws.instance.state !== state && setState(Ws.instance.state);
  }, []);

  mess && useEffect(() => {
    sendMess(mess, state);
  }, [state]);

  return {lastMess, sendMess: (mess: string) => {sendMess(mess, state)}, state};
}

function sendMess(message: string, state: ReadyState){
  state === 1 && Ws.instance.sendMessage(message);
  //state === 1 && console.log("send: ", message);
}