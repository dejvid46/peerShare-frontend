import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import xSvg from "../../icons/x.svg";
import downloadSvg from "../../icons/download.svg";
import AvatarIcon from "../avatar/AvatarIcon";
import type { FileUUID } from "../../helpers/Parsers";
import {Progress} from "@nextui-org/react";
import useFile from "../../helpers/webRTC/useFile";
import { SaveToDisk } from "../../helpers/File";
import FileContainer from "../../helpers/FileContainer";

interface FilePrpos {
  item: FileUUID;
  remove: (item: FileUUID) => void;
  sendMess: (mess: string) => void;
}

export default function FileNotification({ item, remove, sendMess }: FilePrpos) {

  const {file, progress} = useFile(item.uuid);

  if(!file) return <></>;

  return (
    <Card shadow="none" className="h-full max-w-20">
      <CardBody className="flex flex-col p-3 bg-default-100">
        <div className="grow w-full flex">
          <div className="grow flex flex-col items-start sm:gap-1 justify-between">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6">
                  <img
                    src={downloadSvg}
                    alt="Hide icon"
                  />
                </div>
                <p className="text-sm">from:</p> 
                <div className="w-7 h-7">
                  <AvatarIcon id={file.id_from} p={true} />
                </div>
              </div>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                size="sm"
                onClick={() => {
                  FileContainer.instance.deleteFile(item.uuid);
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
            <div className="w-full">
              <p className="text-ellipsis overflow-hidden inline-block max-w-6 font-bold">{file.name}</p>
              {file.state !== "uploaded" && <Progress size="sm" aria-label="Downloading..." value={progress} className="max-w-md py-2"/>}
            </div>
            {file.state === "uploaded" && <>
            <div className="flex w-full gap-3">
              <Button
                size="sm"
                color="success"
                variant="bordered"
                onClick={() => {
                  SaveToDisk(item.uuid, file.blob, file.name);
                  remove(item);
                }}
              >
                Download
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="bordered"
                onClick={() => {
                  remove(item);
                }}
              >
                Cancel
              </Button>
            </div>
            </>}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
