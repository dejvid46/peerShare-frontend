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
    if (lastMess) {
      notifications.push(lastMess)
      setNotification(notifications)
    }
  }, [lastMess]);

  // return [] of Notification for render
}