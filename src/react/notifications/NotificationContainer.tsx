import React, { useEffect } from "react";
import Invite from "./InviteNotification";
import useWSCollector from "../../helpers/ws/UseWSCollector";
import { NewMember, Send, notifications, room } from "../../helpers/Parsers";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import SendNotification from "./SendNotification";
import ErrorNotification from "./ErrorNotification";
import type { Error, FileUUID, ReCaptcha } from "../../helpers/Parsers";
import FileContainer, { MyFile } from "../../helpers/FileContainer";
import FileNotification from "./FileNotification";
import WebRTCContainer from "../../helpers/webRTC/WebRTCContainer";
import ReCaptchaNotification from "./ReCaptchaNotification";

export default function NotificationContainer() {
  const { lastMess, sendMess } = useWebSocket(room);
  const { collector, remove, dropColector, setCollector } =
    useWSCollector(notifications);

  useEffect(() => {
    FileContainer.instance.onNewFile((uuid) => {
      setCollector((c) => [...c, { uuid } as FileUUID]);
    });
  }, []);

  useEffect(() => {
    WebRTCContainer.instance.addRecaptchaRegister(() => {
      setCollector((c) => [...c, { reCaptcha: "reCaptcha" } as ReCaptcha]);
    });
  }, []);

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
      className="lg:fixed bg-transparent lg:left-[5%] lg:max-w-[400px] lg:-translate-x-[5%] lg:-translate-y-2/4 lg:top-2/4 lg:max-h-[50%]"
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
          } else if (notification.uuid) {
            return (
              <div key={key} className="mb-4 lg:row-[span_2] bg-transparent">
                <FileNotification
                  item={notification as FileUUID}
                  remove={remove}
                />
              </div>
            );
          } else if (notification.reCaptcha) {
            return (
              <div key={key} className="mb-4 lg:row-[span_2] bg-transparent">
                <ReCaptchaNotification
                  item={notification as ReCaptcha}
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
