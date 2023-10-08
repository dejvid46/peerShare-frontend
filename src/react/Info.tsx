import { Button, Card, CardBody, Progress } from "@nextui-org/react";
import React, { useState } from "react";
import xSvg from "../icons/x.svg";

interface InfoPrpos {
  text: string;
  buttonText: string;
  progres?: number;
}

export default function Info({ text, buttonText, progres }: InfoPrpos) {
  return (
    <Card>
      <CardBody className="flex flex-col p-4 bg-default-100">
        <div className="grow w-full flex">
          <div className="grow flex sm:flex-col items-center sm:items-start sm:gap-2 justify-between">
            <div>{text}</div>
            <div className="flex gap-2 sm:px-0 px-2">
              <Button size="sm" color="success" variant="bordered">
                {buttonText}
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center sm:justify-start">
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              size="sm"
            >
              <div className="w-4 h-4">
                <img
                  className="fill-default-300/50"
                  src={xSvg}
                  alt="Hide icon"
                />
              </div>
            </Button>
          </div>
        </div>
        {progres && (
          <div className="w-full mt-2 sm:mt-3">
            <Progress size="sm" aria-label="Loading..." value={progres} />
          </div>
        )}
      </CardBody>
    </Card>
  );
}
