import React from "react";
import AvatarPosition from "./AvatarPosition";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import { members, id, message } from "../../helpers/Parsers";
import MyAvatar from "./MyAvatar";

export default function AvatarCircle() {
  const { lastMess: idLastMess } = useWebSocket(id, "/id");
  const { lastMess: membersLastMess } = useWebSocket(members, "/members");
  const { lastMess } = useWebSocket(message);

  if (!membersLastMess || !idLastMess) {
    return <></>;
  }
  const noYou = membersLastMess.ids.filter((x) => x !== idLastMess).sort();

  return (
    <div>
      {<MyAvatar id={idLastMess} rotate={0} translateX={0} />}
      {noYou.map((x, i) => (
        <AvatarPosition
          key={i}
          id={x}
          order={i + 2}
          count={membersLastMess.ids.length}
          mess={lastMess?.id === x ? lastMess.mess : undefined}
        />
      ))}
    </div>
  );
}
