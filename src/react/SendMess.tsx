import { Button, Input } from "@nextui-org/react";
import React from "react";
import Info from "./Info";

export default function SendMess() {
  return (
    <div className="fixed bottom-0 gap-4 flex flex-col">
      <div className="flex flex-row items-center sm:invisible my-8">
        <Input
          size="lg"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-500 sm:text-lg text-base font-bold">
                Mess:{" "}
              </span>
            </div>
          }
          endContent={
            <Button variant="faded" className="min-w-5 h-9">
              Send
            </Button>
          }
        />
        {/* <Button color="primary" variant="shadow" className="min-w-5">
          Send
        </Button> */}
      </div>
    </div>
  );
}
