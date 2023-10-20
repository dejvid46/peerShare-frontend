import React, { useEffect } from "react";
import Invite from "./Invite";
import useWSCollector from "../helpers/UseWSCollector";
import { Send, notifications, room } from "../helpers/Parsers";
import useWebSocket from "../helpers/UseWebSocket";
import type { NewMember } from "../helpers/Notifications";
import SendNotification from "./SendNotification";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector } = useWSCollector(notifications);

  useEffect(() => {
    dropColector();
  }, [lastMess]);

  if (!lastMess) return <></>;

  return (
    <>
      {collector.map((notification: any, key: number) => {
        if (notification.id) {
          return (
            <div className="box">
              <Invite
                sendMess={sendMess}
                key={key}
                item={notification as NewMember}
                remove={remove}
              />
            </div>
          );
        } else if (notification.key) {
          return (
            <div className="box">
              <SendNotification
                sendMess={sendMess}
                key={key}
                item={notification as Send}
                remove={remove}
              />
            </div>
          );
        }
      })}
    </>
  );
}
