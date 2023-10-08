import { useState, useEffect } from "react";
import Ws, { ReadyState } from "./WebSocket";
import type { Result } from "./Result";

export interface Err {
  message: string
}

export default function useWebSocket<T>(parse: (body: string) => Result<T, Err>, mess?: string) {
  const [lastMess, setLastMess] = useState<T | undefined>(undefined);
  const [state, setState] = useState<ReadyState>(Ws.instance.state);

  useEffect(() => {
    Ws.instance.add((e) => {
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

  mess && sendMess(mess, state);

  return {lastMess, sendMess: (mess: string) => {sendMess(mess, state)}, state};
}

function sendMess(message: string, state: ReadyState){
  useEffect(() => {
    state === 1 && Ws.instance.sendMessage(message);
    state === 1 && console.log("send: ", message);
  }, [state]);
}