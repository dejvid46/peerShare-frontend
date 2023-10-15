import React, { useEffect } from "react";
import NewMemberN from "./Invite";
import useWSCollector from "../helpers/UseWSCollector";
import { Send, notifications, room } from "../helpers/Parsers";
import useWebSocket from "../helpers/UseWebSocket";
import type { NewMember } from "../helpers/Notifications";
import SendNotification from "./SendNotification";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector } = useWSCollector(notifications);
  console.log(collector);

  useEffect(() => {
    dropColector();
  }, [lastMess]);

  if (!lastMess) return <></>;

  return (
    <div className="flex flex-col-reverse gap-4">
      {collector.map((notification: any, key: number) => {
        if (notification.id) {
          return (
            <NewMemberN
              sendMess={sendMess}
              key={key}
              item={notification as NewMember}
              remove={remove}
            />
          );
        } else if (notification.key) {
          return (
            <SendNotification
              sendMess={sendMess}
              key={key}
              item={notification as Send}
              remove={remove}
            />
          );
        }
      })}
    </div>
  );
}
