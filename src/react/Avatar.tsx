import React, { useEffect, useState } from "react";
import {
  Avatar as AvatarNextUi,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import AvatarIcon from "./AvatarIcon";

interface AvatarProps {
  id: string;
  translateX: number;
  rotate: number;
  text?: string;
}

export default function Avatar({ rotate, translateX, id, text }: AvatarProps) {
  const [mess, setMess] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMess(text);
    if (text && !mess) {
      setTimeout(() => {
        setMess(undefined);
      }, 3500);
    }
  }, [text]);

  return (
    <div
      style={{
        transform: `rotate(${rotate}deg) translateX(${translateX}%)`,
      }}
      className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
    >
      <Popover placement="bottom" showArrow={true} isOpen={mess ? true : false}>
        <PopoverTrigger>
          <div className="transition-transform transform-gpu hover:scale-125 w-full h-full">
            <AvatarIcon id={id} rotate={rotate} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-tiny">{mess}</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
