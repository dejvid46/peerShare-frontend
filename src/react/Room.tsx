import React from "react";
import useWebSocket from "../helpers/UseWebSocket";
import { room } from "../helpers/Parsers";
import RoomInptut from "./RoomInput";

interface RoomProps {
  children: JSX.Element;
}

export default function Room({ children }: RoomProps) {
  const { lastMess, sendMess } = useWebSocket(room, "/room");
  if (!lastMess) return <></>;
  console.log(lastMess);

  return (
    <RoomInptut room={lastMess} sendMess={sendMess}>
      {children}
    </RoomInptut>
  );
}
