import { useState, useEffect } from "react";
import Ws, { ReadyState } from "./WebSocket";
import type { Result } from "./Result";

export interface Err {
  message: string
}

export default function useWSCollector<T>(parse?: (body: string) => Result<T, Err>, mess?: string) {
  const [collector, setCollector] = useState<Array<T>>([]);
  const [state, setState] = useState<ReadyState>(Ws.instance.state);

  useEffect(() => {
    parse && Ws.instance.add((e) => {
      const res = parse(e.data);
      if (res.ok) {
        setCollector(collector => [...collector, res.value]);
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

  return {collector, dropColector: () => setCollector([]), sendMess: (mess: string) => {sendMess(mess, state)}, state, remove: (item: T) => remove(item, collector, setCollector)};
}

function sendMess(message: string, state: ReadyState){
  state && Ws.instance.sendMessage(message);
}

function remove<T>(item: T, collector: Array<T>, setCollector: React.Dispatch<React.SetStateAction<T[]>>) {
  const index = collector.findIndex((x) => {
    return x === item;
  });
  setCollector(collector => collector.filter((s,i)=>(i != index)));
}