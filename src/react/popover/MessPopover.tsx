import React, { useEffect, useState } from "react";
import Popover from "../components/Popover";

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
      }, 3500);
    }
  }, [text]);

  return (
    <Popover open={open}>
      <>{text}</>
    </Popover>
  );
}
