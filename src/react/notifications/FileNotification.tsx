import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import type { FileUUID } from "../../helpers/Parsers";
import useFile from "../../helpers/webRTC/useFile";
import FileContainer from "../../helpers/FileContainer";
import FilePacking from "./FilePacking";
import { SaveToDisk } from "../../helpers/File";

interface FilePrpos {
  item: FileUUID;
  remove: (item: FileUUID) => void;
}

export default function FileNotification({ item, remove }: FilePrpos) {

  const {file, progress} = useFile(item.uuid);

  if(!file) return <></>;

  const cancelFile = () => {
    FileContainer.instance.deleteFile(item.uuid);
    remove(item);
  }

  const saveFile = () => {
    const file = FileContainer.instance.getFile(item.uuid);
    file?.state === "uploaded" && SaveToDisk(item.uuid, file.blob, file.name);
    remove(item);
  }

  return (
    <Card shadow="none" className="h-full max-w-20">
      <CardBody className="flex flex-col p-3 bg-default-100">
        <FilePacking file={file} progress={progress} saveFile={saveFile} cancelFile={cancelFile} />
      </CardBody>
    </Card>
  );
}
