import { Avatar } from "@nextui-org/react";
import React from "react";

export default function MyAvatar() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar
        isBordered
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <Avatar
        isBordered
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
      <Avatar
        isBordered
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
    </div>
  );
}
