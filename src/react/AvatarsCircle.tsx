import React from "react";
import AvatarPosition from "./AvatarPosition";
import useWebSocket from "../helpers/UseWebSocket";
import { members, id } from "../helpers/Parsers";

export default function AvatarCircle() {
  const { lastMess: idLastMess } = useWebSocket(id, "/id");
  const { lastMess: membersLastMess } = useWebSocket(members, "/members");

  if (!membersLastMess || !idLastMess) {
    return <></>;
  }
  const noYou = membersLastMess.ids.filter((x) => x !== idLastMess).sort();

  return (
    <div>
      {<AvatarPosition id={idLastMess} order={1} count={1} />}
      {noYou.map((x, i) => (
        <AvatarPosition
          key={i}
          id={x}
          order={i + 2}
          count={membersLastMess.ids.length}
        />
      ))}
    </div>
  );
}
