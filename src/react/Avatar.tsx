import React, { useState } from "react";
import { Avatar as AvatarNextUi, AvatarIcon } from "@nextui-org/react";

interface AvatarProps {
  icon: number;
  translateX: number;
  rotate: number;
}

export default function Avatar({ icon, rotate, translateX }: AvatarProps) {
  const [load, setLoad] = useState(".");
  const svg = import(`../icons/${icon}.svg`);
  svg.then((x) => setLoad(x.default));

  return (
    <div
      style={{ transform: `rotate(${rotate}deg) translateX(${translateX}%)` }}
      className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
    >
      <div className="transition-transform transform-gpu hover:scale-125 w-full h-full">
        <AvatarNextUi
          isBordered
          src={load}
          style={{ transform: `rotate(-${rotate}deg)` }}
          classNames={{
            base: "bg-gradient-to-br from-zinc-900 via-slate-900 to-stone-900 w-full h-full p-2",
            icon: "stroke-black/80",
          }}
          alt="Your SVG"
        />
      </div>
    </div>
  );
}
