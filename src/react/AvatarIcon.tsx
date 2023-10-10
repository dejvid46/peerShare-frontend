import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar as AvatarNextUi,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import useWebSocket from "../helpers/UseWebSocket";
import { message } from "../helpers/Parsers";

interface AvatarProps {
  path: number;
  rotate: number;
}

export default function AvatarIcon({ path, rotate }: AvatarProps) {
  const [load, setLoad] = useState(".");

  useEffect(() => {
    const svg = import(`../icons/${path}.svg`);
    svg.then((x) => setLoad(x.default));
  }, []);

  return (
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
  );
}
