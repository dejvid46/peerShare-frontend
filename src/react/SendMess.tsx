import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import Info from "./Info";
import useWebSocket from "../helpers/UseWebSocket";

export default function SendMess() {
  const { sendMess } = useWebSocket();
  const [mess, setMess] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      sendMess(mess);
      setMess("");
    }
  };

  return (
    <div className="fixed bottom-0 gap-4 flex flex-col mx-2">
      <Info
        text={"Harooo kldsf kfds dfsgjio dsfgoidf nfvnj djf n sskjsk"}
        buttonText={"Send"}
      />
      <div className="flex flex-row items-center sm:invisible mb-8">
        <Input
          size="lg"
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
            <Button
              onClick={() => {
                sendMess(mess);
                setMess("");
              }}
              variant="faded"
              className="min-w-5 h-9"
            >
              Send
            </Button>
          }
        />
      </div>
    </div>
  );
}
