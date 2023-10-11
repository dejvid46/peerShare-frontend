import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";
import xSvg from "../icons/x.svg";
import AvatarIcon from "./AvatarIcon";

interface InfoPrpos {
  id: string;
  invited: boolean;
}

export default function Info({ id, invited }: InfoPrpos) {
  return (
    <Card>
      <CardBody className="flex flex-col p-3 bg-default-100">
        <div className="grow w-full flex">
          <div className="grow flex sm:flex-col items-center sm:items-start sm:gap-2 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <AvatarIcon id={id} p={true} />
              </div>
              <div>wants to join</div>
            </div>
            <div className="flex gap-2 sm:px-0 px-2">
              <Button size="sm" color="success" variant="bordered">
                Invite
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
        {/* {progres && (
          <div className="w-full mt-2 sm:mt-3">
            <Progress size="sm" aria-label="Loading..." value={progres} />
          </div>
        )} */}
      </CardBody>
    </Card>
  );
}
