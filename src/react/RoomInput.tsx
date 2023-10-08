import { Button, Input } from "@nextui-org/react";
import React from "react";
import useWebSocket from "../helpers/UseWebSocket";
import { room, test } from "../helpers/Parsers";

interface RoomInptProps {
  children: JSX.Element;
}

export default function RoomInpt({ children }: RoomInptProps) {
  const { lastMess } = useWebSocket(room, "/room");
  lastMess && console.log(lastMess);

  return (
    <div className="flex flex-row items-center mx-2">
      <Input
        size="lg"
        type="number"
        className="mr-4"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-500 sm:text-lg text-base font-bold">
              Room:{lastMess?.id}
            </span>
          </div>
        }
        endContent={
          <Button variant="faded" className="min-w-5 h-9">
            Join
          </Button>
        }
      />
      <Button
        color="primary"
        variant="shadow"
        className="min-w-5"
        startContent={children}
      >
        Share
      </Button>
    </div>
  );
}
