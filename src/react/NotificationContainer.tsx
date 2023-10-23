import React, { useEffect } from "react";
import Invite from "./Invite";
import useWSCollector from "../helpers/UseWSCollector";
import { NewMember, Send, notifications, room } from "../helpers/Parsers";
import useWebSocket from "../helpers/UseWebSocket";
import SendNotification from "./SendNotification";
import ErrorNotification from "./ErrorNotification";
import type { Error } from "../helpers/Parsers";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector } = useWSCollector(notifications);

  useEffect(() => {
    dropColector();
  }, [lastMess]);

  if (!lastMess) return <></>;

  return (
    <div
      dir="rtl"
      className="sm:fixed bg-transparent sm:left-[10%] sm:-translate-x-[10%] sm:-translate-y-2/4 sm:top-2/4 sm:max-h-[50%] sm:overflow-auto"
    >
      <div
        dir="ltr"
        className="sm:grid sm:gap-[0px_1rem] sm:grid-cols-[1fr] xl:grid-cols-[1fr_1fr] sm:grid-flow-dense"
      >
        <div className="invisible"></div>
        <div className="invisible sm:row-[span_2]"></div>
        {collector.map((notification: any, key: number) => {
          if (notification.id) {
            return (
              <div key={key} className="mb-4 sm:row-[span_2] bg-transparent">
                <Invite
                  sendMess={sendMess}
                  item={notification as NewMember}
                  remove={remove}
                />
              </div>
            );
          } else if (notification.key) {
            return (
              <div key={key} className="mb-4 sm:row-[span_2] bg-transparent">
                <SendNotification
                  sendMess={sendMess}
                  item={notification as Send}
                  remove={remove}
                />
              </div>
            );
          } else if (notification.error_message) {
            return (
              <div key={key} className="mb-4 sm:row-[span_2] bg-transparent">
                <ErrorNotification
                  item={notification as Error}
                  remove={remove}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
