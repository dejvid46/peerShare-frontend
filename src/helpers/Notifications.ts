interface NewMember{
  id: string;
  room: number;
  invited: boolean;
  setInvite: React.Dispatch<React.SetStateAction<boolean>>
}

interface AcceptFile{
  id: string;
  name: string;
  Accepted: boolean;
}

export default class Notifications {

  static instance = new Notifications();

  constructor(
    private _notifications: Array<NewMember | AcceptFile> = [],
  ) {}

  public add(notification: NewMember | AcceptFile) {
    !this._notifications.includes(notification) && this._notifications.push(notification);
  }

  public remove(index: number) {
    this._notifications.splice(index, 1);;
  }
}
