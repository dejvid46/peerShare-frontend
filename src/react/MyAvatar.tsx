import React from "react";
import AvatarIcon from "./AvatarIcon";

interface AvatarProps {
  id: string;
  translateX: number;
  rotate: number;
  text?: string;
}

export default function MyAvatar({ rotate, translateX, id }: AvatarProps) {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg) translateX(${translateX}%)`,
      }}
      className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
    >
      <AvatarIcon id={id} rotate={rotate} />
      <div className="flex flex-col items-center w-full text-tiny mt-1 text-[#A1A1AA] invisible">
        <div>You</div>
      </div>
    </div>
  );
}
