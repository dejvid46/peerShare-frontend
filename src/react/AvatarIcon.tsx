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
  id: string;
  rotate?: number;
  p?: boolean;
}

export default function AvatarIcon({ id, rotate, p }: AvatarProps) {
  const [load, setLoad] = useState(".");
  const hash = Number.parseInt(id.slice(-3)) % 24;

  useEffect(() => {
    const svg = import(`../icons/${hash}.svg`);
    svg.then((x) => setLoad(x.default));
  }, [id]);

  return (
    <AvatarNextUi
      isBordered
      src={load}
      style={{ transform: `rotate(-${rotate || 0}deg)` }}
      classNames={{
        base: p
          ? "bg-gradient-to-br from-zinc-900 via-slate-900 to-stone-900 w-full h-full p-[2px]"
          : "bg-gradient-to-br from-zinc-900 via-slate-900 to-stone-900 w-full h-full p-2",
        icon: "stroke-black/80",
      }}
      alt="Your SVG"
    />
  );
}
