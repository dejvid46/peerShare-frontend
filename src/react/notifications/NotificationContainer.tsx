import React, { useEffect } from "react";
import Invite from "./InviteNotification";
import useWSCollector from "../../helpers/ws/UseWSCollector";
import { NewMember, Send, notifications, room } from "../../helpers/Parsers";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import SendNotification from "./SendNotification";
import ErrorNotification from "./ErrorNotification";
import type { Acceptation, Error } from "../../helpers/Parsers";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector } = useWSCollector(notifications);

  /*
  cau davidku tady zuzanka lmaoooooo

  moc dobry
  */

  useEffect(() => {
    dropColector();
  }, [lastMess]);

  if (!lastMess) return <></>;

  return (
    <div
      dir="rtl"
      className="lg:fixed bg-transparent lg:left-[5%] lg:max-w-[400px] lg:-translate-x-[5%] lg:-translate-y-2/4 lg:top-2/4 lg:max-h-[50%] lg:overflow-auto"
    >
      <div
        dir="ltr"
        className="lg:grid lg:gap-[0px_1rem] lg:grid-cols-[1fr] xl:grid-cols-[1fr_1fr] lg:grid-flow-dense"
      >
        <div className="invisible"></div>
        <div className="invisible lg:row-[span_2]"></div>
        {collector.map((notification: any, key: number) => {
          if (notification.id) {
            return (
              <div key={key} className="mb-4 lg:row-[span_2] bg-transparent">
                <Invite
                  sendMess={sendMess}
                  item={notification as NewMember}
                  remove={remove}
                />
              </div>
            );
          } else if (notification.key) {
            return (
              <div key={key} className="mb-4 lg:row-[span_2] bg-transparent">
                <SendNotification
                  sendMess={sendMess}
                  item={notification as Send}
                  remove={remove}
                />
              </div>
            );
          } else if (notification.error_message) {
            return (
              <div key={key} className="mb-4 lg:row-[span_2] bg-transparent">
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
