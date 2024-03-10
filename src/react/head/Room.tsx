import React from "react";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import { room } from "../../helpers/Parsers";
import RoomInptut from "./RoomInput";

interface RoomProps {
  children: JSX.Element;
}

export default function Room({ children }: RoomProps) {
  const { lastMess, sendMess } = useWebSocket(room, "/room");
  if (!lastMess) return <></>;

  return (
    <RoomInptut room={lastMess} sendMess={sendMess}>
      {children}
    </RoomInptut>
  );
}
