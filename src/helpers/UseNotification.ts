import { useEffect, useState } from "react";
import { invite } from "./Parsers";
import useWebSocket from "./UseWebSocket";

export interface NewMember{
  id: string;
  room: string;
  invited: boolean;
}

export interface AcceptFile{
  id: string;
  name: string;
  Accepted: boolean;
}

export default function UseNotification() {
  const [notifications, setNotification] = useState<Array<NewMember | AcceptFile>>([]);
  const {lastMess} = useWebSocket(invite);

  useEffect(() => {
    if (lastMess && !notifications.find((x: any) => x.id === lastMess.id && x.room ===lastMess.room && x.room)) {
      notifications.push(lastMess)
      setNotification(notifications)
    }
  }, [lastMess]);

  return notifications;
}