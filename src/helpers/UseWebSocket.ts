import { useState, useEffect } from "react";
import Ws, { ReadyState } from "./WebSocket";
import type { Result } from "./Result";

export interface Err {
  message: string
}

export default function useWebSocket<T>(parse?: (body: string) => Result<T, Err>, mess?: string) {
  const [lastMess, setLastMess] = useState<T | undefined>(undefined);
  const [state, setState] = useState<ReadyState>(Ws.instance.state);

  useEffect(() => {
    parse && Ws.instance.add((e) => {
      const res = parse(e.data);
      if (res.ok) {
        setLastMess(res.value);
      }else{
        //console.error({mess: res.error, send: mess});
      }
    })
    
    Ws.instance.addStateListener((state) => {
      setState(state);
    })
    Ws.instance.state !== state && setState(Ws.instance.state);
  }, []);

  mess && useEffect(() => {
    sendMess(mess, state);
  }, [state]);

  return {lastMess, sendMess: (mess: string) => {sendMess(mess, state)}, state};
}

function sendMess(message: string, state: ReadyState){
  state && Ws.instance.sendMessage(message);
  state && console.log("send: ", message);
}