import React, { useEffect, useRef, useState } from "react";
import AvatarIcon from "./AvatarIcon";
import MessPopover from "./MessPopover";
import AcceptFile from "./AcceptFile";

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

  const onUpload = (files: FileList) => {
    setFiles((x) => [...files]);
  };

  useEffect(() => {
    if (!drop || !drop.current) return;
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);

    return () => {
      if (!drop || !drop.current) return;
      drop.current.removeEventListener("dragover", handleDragOver);
      drop.current.removeEventListener("drop", handleDrop);
    };
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
          {(files && (
            <AcceptFile
              files={files}
              id={id}
              cancelFiles={() => setFiles(undefined)}
            />
          )) || <MessPopover text={text} />}
        </div>
      </div>
      {/* <div
        style={{
          transform: `rotate(${rotate}deg) translateX(${translateX}%) translateY(${0})`,
        }}
        className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
      ></div> */}
    </>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
//   Button,
// } from "@nextui-org/react";
// import AvatarIcon from "./AvatarIcon";
// import WebRTCContainer from "../helpers/WebRTCContainer";
// import FileAccept from "../helpers/FileAccept";
// import Ws from "../helpers/WebSocket";
// import { useOverlayTriggerState } from "@react-stately/overlays";
// import {
//   OverlayContainer,
//   useOverlayPosition,
//   useOverlayTrigger,
// } from "@react-aria/overlays";

// // react aria popover
// // https://codesandbox.io/p/sandbox/react-aria-popover-u8olzd?file=%2Fsrc%2FExample.js%3A2%2C1-7%2C31

// interface AvatarProps {
//   id: string;
//   translateX: number;
//   rotate: number;
//   text?: string;
// }

// const handleDragOver = (e: DragEvent) => {
//   e.preventDefault();
//   e.stopPropagation();
// };

// export default function Avatar({ rotate, translateX, id, text }: AvatarProps) {
//   const [mess, setMess] = useState<string | undefined>(undefined);
//   const [files, setFiles] = useState<File[] | undefined>(undefined);
//   const inputFile = useRef<HTMLInputElement>(null);
//   const drop = useRef<HTMLDivElement>(null);

//   const onUpload = (files: FileList) => {
//     setFiles((x) => [...files]);
//   };

//   useEffect(() => {
//     setMess(text);
//     if (text && !mess) {
//       setTimeout(() => {
//         setMess(undefined);
//       }, 3500);
//     }
//   }, [text]);

//   useEffect(() => {
//     if (!drop || !drop.current) return;
//     drop.current.addEventListener("dragover", handleDragOver);
//     drop.current.addEventListener("drop", handleDrop);

//     return () => {
//       if (!drop || !drop.current) return;
//       drop.current.removeEventListener("dragover", handleDragOver);
//       drop.current.removeEventListener("drop", handleDrop);
//     };
//   }, []);

//   const handleDrop = (e: DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!e.dataTransfer) return;
//     const { files } = e.dataTransfer;
//     if (files && files.length) {
//       onUpload(files);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.target.files || !event.target.files.length) return;
//     onUpload(event.target.files);
//     event.target.value = "";
//   };

//   return (
//     <div
//       style={{
//         transform: `rotate(${rotate}deg) translateX(${translateX}%)`,
//       }}
//       className="absolute sm:h-16 sm:w-16 sm:left-[calc(50%_-_32px)] sm:top-[calc(50%_-_32px)] h-12 w-12 left-[calc(50%_-_24px)] top-[calc(50%_-_24px)] rounded-[50%]"
//     >
//       <Popover
//         placement="bottom"
//         showArrow={true}
//         isOpen={mess || files ? true : false}
//         // onClose={() => {
//         //   setMess(undefined);
//         //   setFiles(undefined);
//         // }}
//         shouldCloseOnInteractOutside={(e) => {
//           console.log(e);
//           return true;
//         }}
//       >
//         <PopoverTrigger>
//           <div
//             ref={drop}
//             onClick={() => inputFile.current && inputFile.current.click()}
//             className="transition-transform transform-gpu hover:scale-125 w-full h-full"
//           >
//             <input
//               className="hidden"
//               ref={inputFile}
//               type="file"
//               multiple
//               onChange={handleFileChange}
//             />
//             <AvatarIcon id={id} rotate={rotate} />
//           </div>
//         </PopoverTrigger>
//         <PopoverContent
//           style={{
//             transform: `rotate(${360 - rotate}deg)`,
//             transformOrigin: "top center",
//           }}
//         >
//           {(files && (
//             <div className="px-1 py-2 flex-col">
//               <div className=" max-w-[80vw] text-ellipsis mb-2">
//                 {(files.length === 1 && <>Selected {files[0].name}</>) || (
//                   <>Selected {files.length} files</>
//                 )}
//               </div>
//               <div className="flex justify-around gap-2">
//                 <Button
//                   onClick={() => {
//                     // FileAccept.instance.allow(id);
//                     // Ws.instance.sendMessage(
//                     //   `/direct_message ${id} acceptation`
//                     // );
//                     WebRTCContainer.instance.register(id);
//                     WebRTCContainer.instance.sendFiles(id, files);
//                     setFiles(undefined);
//                   }}
//                   color="success"
//                   variant="bordered"
//                 >
//                   Send
//                 </Button>
//                 <Button
//                   onClick={() => setFiles(undefined)}
//                   color="danger"
//                   variant="bordered"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )) ||
//             (mess && (
//               <div className="px-1 py-2">
//                 <div className="text-tiny">{mess}</div>
//               </div>
//             )) || <div />}
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
