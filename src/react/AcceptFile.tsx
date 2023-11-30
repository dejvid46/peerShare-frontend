import React from "react";
import Popover from "./Popover";
import { Button } from "@nextui-org/react";
import WebRTCContainer from "../helpers/WebRTCContainer";

interface AcceptFilePrpos {
  files: File[];
  id: string;
  cancelFiles: () => void;
}

export default function AcceptFile({
  files,
  id,
  cancelFiles,
}: AcceptFilePrpos) {
  return (
    <Popover open={true}>
      <div className="px-1 py-2 flex-col">
        <div className=" max-w-[80vw] text-ellipsis mb-2">
          {(files.length === 1 && <>Selected {files[0].name}</>) || (
            <>Selected {files.length} files</>
          )}
        </div>
        <div className="flex justify-around gap-2">
          <Button
            onClick={() => {
              WebRTCContainer.instance.register(id);
              WebRTCContainer.instance.sendFiles(id, files);
              cancelFiles();
            }}
            color="success"
            variant="bordered"
          >
            Send
          </Button>
          <Button onClick={cancelFiles} color="danger" variant="bordered">
            Cancel
          </Button>
        </div>
      </div>
    </Popover>
  );
}
