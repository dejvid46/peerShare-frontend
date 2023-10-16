import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar as AvatarNextUi,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import useWebSocket from "../helpers/UseWebSocket";
import { message } from "../helpers/Parsers";
import AvatarIcon from "./AvatarIcon";

interface AvatarProps {
  id: string;
  translateX: number;
  rotate: number;
}

export default function Avatar({ rotate, translateX, id }: AvatarProps) {
  const [text, setText] = React.useState<undefined | string>(undefined);

  const { lastMess } = useWebSocket(message(id));
  console.log(id)

  useEffect(() => {
    setText(lastMess);
    if (lastMess) {
      setTimeout(() => {
        setText(undefined);
      }, 2000);
    }
  }, [lastMess]);

  return (
    <Popover
      placement="bottom"
      showArrow={true}
      isOpen={typeof text !== "undefined"}
    >
      <div
        style={{
          transform: `rotate(${rotate}deg) translateX(${translateX}%)`,
        }}
        className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
      >
        <PopoverTrigger>
          <div className="transition-transform transform-gpu hover:scale-125 w-full h-full">
            <AvatarIcon id={id} rotate={rotate} />
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-tiny">{text}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
