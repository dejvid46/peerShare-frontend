import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import type { Room } from "../../helpers/Parsers";
import ShareModal from "./ShareModal";

interface RoomInptProps {
  sendMess: (mess: string) => void;
  room: Room;
  children: JSX.Element;
}

export default function RoomInpt({ children, room, sendMess }: RoomInptProps) {
  const [roomInput, setRoomInput] = useState(room.id);
  const queryParameters = new URLSearchParams(window.location.search);
  const join_room = queryParameters.get("room");
  const key = queryParameters.get("key");
  if (join_room && key) {
    sendMess(`/join ${join_room} ${key}`);
    sendMess("/room");
    sendMess("/members");
    queryParameters.delete("room");
    queryParameters.delete("key");
    window.history.pushState(
      {},
      document.title,
      "/" + queryParameters.toString()
    );
  }

  const invite = () => {
    room.id !== roomInput && roomInput && sendMess(`/invite ${roomInput}`);
    setRoomInput((_) => room.id);
  };

  useEffect(() => {
    setRoomInput((_) => room.id);
  }, [room]);

  return (
    <div className="flex flex-row items-center mx-2">
      <Input
        size="lg"
        type="number"
        className="mr-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            invite();
          }
        }}
        onChange={(e) => setRoomInput(e.target.value)}
        value={roomInput}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-500 sm:text-lg text-base font-bold">
              Room:
            </span>
          </div>
        }
        endContent={
          <Button onClick={invite} variant="faded" className="min-w-5 h-9">
            Join
          </Button>
        }
      />
      <ShareModal>{children}</ShareModal>
    </div>
  );
}
