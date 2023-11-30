import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import SendMess from "./SendMess";
import useWSCollector from "../helpers/UseWSCollector";
import { id, message } from "../helpers/Parsers";
import useWebSocket from "../helpers/UseWebSocket";
import AvatarIcon from "./AvatarIcon";

export default function ChatSendMess() {
  const { collector, add } = useWSCollector(message);
  const { lastMess } = useWebSocket(id);

  return (
    <div className="hidden lg:block fixed bg-transparent w-[20%] max-w-[300px] min-w-[200px] right-[5%] -translate-y-2/4 top-2/4 h-[50%]">
      <Card className="h-full">
        <CardBody className="h-full flex flex-col-reverse gap-4">
          <SendMess add={add} />
          <div className="flex flex-col-reverse gap-2 overflow-auto">
            {[...collector].reverse().map((mess, i) => {
              if (mess.id !== lastMess)
                return (
                  <div key={i} className="flex">
                    <div className="w-6 h-6 m-1 mr-2">
                      <AvatarIcon
                        id={mess.id}
                        rotate={0}
                        p={true}
                        w={24}
                        h={24}
                      />
                    </div>
                    <Card className="bg-[#27272A]">
                      <CardBody className="px-4 py-2">
                        <div className="flex flex-row-reverse grow-0">
                          {mess.mess}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                );
              return (
                <div key={i} className="flex flex-row-reverse max-v-[75%]">
                  <Card className="bg-[#27272A]">
                    <CardBody className="px-4 py-2">
                      <div className="flex flex-row-reverse grow-0">
                        {mess.mess}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
