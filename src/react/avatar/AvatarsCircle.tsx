import React, { useEffect } from "react";
import AvatarPosition from "./AvatarPosition";
import useWebSocket from "../../helpers/ws/UseWebSocket";
import { members, id, message } from "../../helpers/Parsers";
import MyAvatar from "./MyAvatar";
import WebRTCContainer from "../../helpers/webRTC/WebRTCContainer";

export default function AvatarCircle() {
  const { lastMess: idLastMess } = useWebSocket(id, "/id");
  const { lastMess: membersLastMess } = useWebSocket(members, "/members");
  const { lastMess } = useWebSocket(message);

  useEffect(() => {
    idLastMess && (WebRTCContainer.instance.id_from = idLastMess);
  }, [idLastMess])

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
