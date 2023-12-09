import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface PopoverProps {
  open: boolean;
  children: JSX.Element;
}

export default function Popover({ children, open }: PopoverProps) {
  if (!open) return <></>;
  return (
    <div className="h-full w-full flex justify-center mt-[]">
      <div
        style={{
          position: "absolute",
          transformOrigin: "center center",
        }}
        className="jdhskf"
      >
        <Card>
          <CardBody className="p-4">{children}</CardBody>
        </Card>
      </div>
    </div>
  );
}
