import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import xSvg from "../icons/x.svg";
import AvatarIcon from "./AvatarIcon";
import type { Send } from "../helpers/Parsers";

interface SendNotificationPrpos {
  item: Send;
  remove: (item: Send) => void;
  sendMess: (mess: string) => void;
}

export default function SendNotification({
  item,
  remove,
  sendMess,
}: SendNotificationPrpos) {
  return (
    <Card>
      <CardBody className="flex flex-col p-3 bg-default-100">
        <div className="grow w-full flex">
          <div className="grow flex sm:flex-col items-center sm:items-start sm:gap-2 justify-between">
            <div className="flex items-center gap-3 pl-2">
              <div>Join room {item.room}?</div>
            </div>
            <div className="flex gap-2 sm:px-0 px-2">
              <Button
                size="sm"
                color="success"
                variant="bordered"
                onClick={() => {
                  sendMess(`/join ${item.room} ${item.key}`);
                  sendMess("/room");
                  sendMess("/members");
                  remove(item);
                }}
              >
                Invite
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center sm:justify-start">
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              size="sm"
              onClick={() => {
                remove(item);
              }}
            >
              <div className="w-4 h-4">
                <img
                  className="fill-default-300/50"
                  src={xSvg}
                  alt="Hide icon"
                />
              </div>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
