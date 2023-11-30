import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface PopoverProps {
  open: boolean;
  children: JSX.Element;
  openTime?: number;
}

export default function Popover({ children, open, openTime }: PopoverProps) {
  const [shouldOpen, setShouldOpen] = useState<boolean>(open);

  useEffect(() => {
    setShouldOpen(open);
  }, [open]);

  useEffect(() => {
    if (openTime) {
      setTimeout(() => {
        setShouldOpen(false);
      }, openTime);
    }
  });

  if (!shouldOpen) return <></>;
  return (
    <div className="before:content-[''] before:block before:absolute before:top-[-10px] before:border-b-[10px] before:border-b-[#18181B] before:border-x-[10px] before:border-x-transparent before:border-solid before:right-1/2 before:translate-x-1/2">
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}
