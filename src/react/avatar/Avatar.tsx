import React, { useEffect, useRef, useState } from "react";
import AvatarIcon from "./AvatarIcon";
import MessPopover from "../popover/MessPopover";
import AcceptFile from "../popover/AcceptFilePopover";

interface AvatarProps {
  id: string;
  translateX: number;
  rotate: number;
  text?: string;
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function Avatar({ rotate, translateX, id, text }: AvatarProps) {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const inputFile = useRef<HTMLInputElement>(null);
  const drop = useRef<HTMLDivElement>(null);

  const onUpload = (newfiles: FileList) => {
    setFiles([...newfiles]);
  };

  useEffect(() => {
    if (!drop || !drop.current) return;
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
  }, []);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer) return;
    const { files } = e.dataTransfer;
    if (files && files.length) {
      onUpload(files);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    onUpload(event.target.files);
    event.target.value = "";
    event.target.files = null;
  };

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotate}deg) translateX(${translateX}%)`,
        }}
        className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
      >
        <div
          style={{
            position: "absolute",
            transform: `rotate(${-rotate || 0}deg)`,
            transformOrigin: "center center",
          }}
        >
          <div
            ref={drop}
            onClick={() => inputFile.current && inputFile.current.click()}
            className="transition-transform transform-gpu hover:scale-125 w-full h-full"
          >
            <input
              className="hidden"
              ref={inputFile}
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <AvatarIcon id={id} rotate={0} />
          </div>
          <AcceptFile
            files={files}
            id={id}
            cancelFiles={() => setFiles(undefined)}
          />
          <MessPopover text={text} />
        </div>
      </div>
    </>
  );
}
