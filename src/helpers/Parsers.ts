import type { Result } from "./Result";
import type { Err } from "./UseWebSocket";
import { ok, err } from "./Result";
import type { NewMember } from "./UseNotification";

interface Room {
  id: string,
  key: string
}

interface Members {
  ids: Array<string>,
}

export function test(x: string): Result<string, Err> {
  return { ok: true, value: x };
}

export function invite(x: string): Result<NewMember, Err> {
  if(!x.startsWith("/invite "))  return err({message: "Must start with '/invite '"});
  const body = x.split(" ");
  const room = body[1];
  const id = body[2];
  if(!id || !room) return err({message: "Id and room must be number"});

  return { ok: true, value: {room, id, invited: false} };
}

export function room(x: string): Result<Room, Err> {
  if(!x.startsWith("/room "))  return err({message: "Must start with '/room '"});
  const body = x.split(" ");
  const id = body[1];
  const key = body[2];
  if(!id || !key) return err({message: "Id and key must be number"});
  

  return ok({ id, key });
}

export function members(x: string): Result<Members, Err> {
  if(!x.startsWith("/members ")) return err({message: "Must start with '/members '"});
  console.log(x);
  return ok({ids: x.slice(9).replace("[", "").replace("]", "").split(", ")});
}

export function id(x: string): Result<string, Err> {
  if(!x.startsWith("/id ")) return err({message: "Must start with '/id '"});
  const body = x.split(" ");
  const id = body[1];
  if(!id) return err({message: "Id must be number"});
  return ok(id);
}

export function message(y: string): (x: string) => Result<string, Err> {
  return (x) => {
    if(!x.startsWith("/message "))  return err({message: "Must start with '/message '"});
    const body = x.split(" ");
    const id = body[1];
    const mess = body.slice(2).join(" ");
    if(!id || !mess) return err({message: "Id and message must be included"});
    if(id !== y) return err({message: "Id is not same"});

    return ok(mess);
  }
}