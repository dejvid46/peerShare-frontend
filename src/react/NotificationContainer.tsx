import React, { useEffect } from "react";
import NewMember from "./NewMember";
import useWSCollector from "../helpers/UseWSCollector";
import { invite, room } from "../helpers/Parsers";
import useWebSocket from "../helpers/UseWebSocket";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector } = useWSCollector(invite);

  useEffect(() => {
    dropColector();
  }, [lastMess]);

  if (!lastMess) return <></>;

  return (
    <div className="flex flex-col-reverse gap-4">
      {collector.map((notification: any, key: number) => {
        return (
          <NewMember
            sendMess={sendMess}
            key={key}
            item={notification}
            remove={remove}
          />
        );
      })}
    </div>
  );
}
