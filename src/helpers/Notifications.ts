export interface NewMember{
  id: string;
  room: string;
}

export interface AcceptFile{
  id: string;
  name: string;
}

export default class Notifications {
  static instance = new Notifications();
  constructor(
    private _data: Array<NewMember | AcceptFile> = []
  ) {}

  public data() {
    return this._data;
  }

  public push(item: NewMember | AcceptFile) {
    return this._data.push(item);
  }

  public remove(i: number) {
    console.log(this._data)
    this._data.splice(i, 1);
    console.log(this._data)
  }
}