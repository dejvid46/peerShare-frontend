
export type MyFile = {
  id_from: string;
  id_to: string;
  name: string;
  maxChunks: number;
  lastModifiedDate: string;
  size: number;
  type: string;
  listeners: Array<(file: MyFile) => void>;
  position: number;
  state: "uploading";
} | {
  id_from: string;
  id_to: string;
  name: string;
  lastModifiedDate: string;
  maxChunks: number;
  position: number;
  size: number;
  type: string;
  blob: Blob;
  listeners: Array<(file: MyFile) => void>;
  state: "uploaded";
  file: File;
}

export default class FileContainer {
  static instance = new FileContainer();

  constructor(
    private _Files: Map<string, MyFile> = new Map(),
    private _onNewFile: Array<(uuid: string) => void> = new Array(),
  ) { }

  public onNewFile(f: (uuid: string) => void) {
    this._onNewFile.push(f);
  }

  public deleteFile(uuid: string){
    this._Files.delete(uuid);
  }

  public onFileChange(uuid: string, f: (file: MyFile) => void){
    const file = this._Files.get(uuid);
    if (file) {
      file.listeners.push(f);
    }
  }

  public updateFile(uuid: string, currentPosition: number) {
    const file = this._Files.get(uuid);
    if (file) {
      file.position = currentPosition;
      file.listeners.forEach(f => f(file));
    }
  }

  public getFile(uuid: string) {
    return this._Files.get(uuid);
  }

  public finishFile(uuid: string, blob: Blob, file: File) {
    let oldFile = this._Files.get(uuid);
    if (oldFile) {
      const newFile = {
        id_from: oldFile.id_from,
        id_to: oldFile.id_to,
        name: oldFile.name,
        maxChunks: oldFile.maxChunks,
        lastModifiedDate: oldFile.lastModifiedDate,
        size: oldFile.size,
        type: oldFile.type,
        blob: blob,
        listeners: oldFile.listeners,
        position: oldFile.position,
        state: "uploaded",
        file: file,
      } as MyFile;
      this._Files.set(uuid, newFile);
      newFile.listeners.forEach(f => f(newFile));
    }
  }

  public registerFile(uuid: string, id_from: string, id_to: string, name: string, maxChunks: number, lastModifiedDate: string, size: number, type: string) {
    this._Files.set(uuid, {
      id_from,
      id_to,
      name,
      maxChunks,
      lastModifiedDate,
      size,
      type,
      listeners: [],
      position: 0,
      state: "uploading"
    } as MyFile);
    this._onNewFile.forEach(f => f(uuid));
  }
}