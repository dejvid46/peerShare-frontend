import { useEffect, useState } from "react";
import FileContainer from "../FileContainer";

export default function useFile(uuid: string) {
  const [file, setFile] = useState(FileContainer.instance.getFile(uuid));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    FileContainer.instance.onFileChange(uuid, (file) => {
      setProgress(Math.floor(file.position/file.maxChunks*100))
      setFile(file);
    });
  }, [uuid]);

  return {file, progress};
}