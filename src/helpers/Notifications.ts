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
    private _new_member_pool: Array<NewMember | AcceptFile> = [],
  ) {}
}
