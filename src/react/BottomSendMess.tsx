import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function BottomSendMess() {
  return (
    <div className="flex flex-row items-center ">
      <Input
        className="mr-4"
        key="outside-left"
        labelPlacement="outside-left"
        size="lg"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-500 sm:text-lg text-base font-bold">
              Mess:{" "}
            </span>
          </div>
        }
      />
      <Button color="primary" variant="shadow" className="min-w-5">
        Send
      </Button>
    </div>
  );
}
