import React, { useEffect, useState } from "react";
import Popover from "./Popover";

interface MessPopoverPrpos {
  text?: string;
}

export default function MessPopover({ text }: MessPopoverPrpos) {
  const [open, setOpen] = useState(text ? true : false);

  useEffect(() => {
    if (text) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  }, [text]);

  return (
    <Popover open={open}>
      <>{text}</>
    </Popover>
  );
}
