import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import xSvg from "../../icons/x.svg";
import warning from "../../icons/warning.svg";
import type { Error } from "../../helpers/Parsers";

interface ErrorPrpos {
  item: Error;
  remove: (item: Error) => void;
}

export default function ErrorNotification({ item, remove }: ErrorPrpos) {
  return (
    <Card shadow="none" className="h-full">
      <CardBody className="flex flex-col p-3 bg-default-100 sm:gap-3">
        <div className="grow w-full flex">
          <div className="grow flex sm:flex-col items-center sm:items-start sm:gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img
                  className="h-auto w-full "
                  src={warning}
                  alt="enter room icon"
                />
              </div>
              <div>{item.error_message}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center sm:justify-start">
            <Button
              isIconOnly
              className="data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              size="sm"
              onClick={() => {
                remove(item);
              }}
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
        {/* {progres && (
          <div className="w-full mt-2 sm:mt-3">
            <Progress size="sm" aria-label="Loading..." value={progres} />
          </div>
        )} */}
      </CardBody>
    </Card>
  );
}
