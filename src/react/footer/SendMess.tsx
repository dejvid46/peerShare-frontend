import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import type { Message } from "../../helpers/Parsers";
import { id } from "../../helpers/Parsers";

interface SendMessProps {
  add?: (item: Message) => void;
}

export default function SendMess({ add }: SendMessProps) {
  const { sendMess, lastMess } = useWebSocket(id);
  const [mess, setMess] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      send();
    }
  };

  const send = () => {
    if (mess) {
      sendMess(mess);
      add && lastMess && add({ id: lastMess, mess: mess } as Message);
      setMess("");
    }
  };

  return (
    <div className="flex flex-row items-center">
      <label htmlFor="message" className="sr-only">Message</label>
      <Input
        size="lg"
        name="message"
        aria-label="message"
        value={mess}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMess(e.target.value)}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-500 sm:text-lg text-base font-bold">
              Mess:{" "}
            </span>
          </div>
        }
        endContent={
          <Button onClick={send} variant="faded" className="min-w-5 h-9">
            Send
          </Button>
        }
      />
    </div>
  );
}
