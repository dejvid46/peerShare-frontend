import type { Result } from "./Result";
import type { Err } from "./ws/UseWebSocket";
import { ok, err } from "./Result";

export interface NewMember{
  id: string;
  room: string;
}

export interface Room {
  id: string,
  key: string
}

export interface Acceptation {
  acceptationId: string,
}

interface Members {
  ids: Array<string>,
}

export interface Error {
  error_message: string
}

export interface Send {
  room: string,
  key: string
}
export interface Message {
  id: string;
  mess: string;
} 
export interface JsonStructiure {
  type: string;
  id: string;
  json: any;
} 

export function acceptation(x: string): Result<Acceptation, Err> {
  if(!x.startsWith("/direct_message ")) return err({message: "Must start with '/direct_message '"});
  const body = x.split(" ");
  const id = body[1];
  const type = body[2];
  if(!id || !type || type !== "acceptation") return err({message: "Id and type required"});
  return ok({ acceptationId: id });
}

export function test(x: string): Result<string, Err> {
  return { ok: true, value: x };
}

export function parseDirectIdJSON(x: string): Result<JsonStructiure, Err> {
  if(!x.startsWith("/direct_message ")) return err({message: "Must start with '/direct_message '"});
  const body = x.split(" ");
  const id = body[1];
  const type = body[2];
  if(!type || !id) return err({message: "Type and json required"});
  console.log(x)
  // let json;
  // try {
  //   json = JSON.parse(body.slice(3).join(" "));
  // }catch{
  //   return err({message: "Can not parse JSON"});
  // }
  const json = JSON.parse(body.slice(3).join(" "))
  if(!type || !json || !id) return err({message: "Type and json required"});
  return ok({type, id, json});
}

export function notifications(x: string): Result<Acceptation | NewMember | Send | Error, Err> {
  const resinvite = invite(x);
  if(resinvite.ok) return resinvite;
  const reserror = error(x);
  if(reserror.ok) return reserror;
  const resOffer = acceptation(x);
  if(resOffer.ok) return resOffer;
  return send(x);
}

export function invite(x: string): Result<NewMember, Err> {
  if(!x.startsWith("/invite ")) return err({message: "Must start with '/invite '"});
  const body = x.split(" ");
  const room = body[1];
  const id = body[2];
  if(!id || !room) return err({message: "Id and room required"});
  
  return { ok: true, value: {room, id} };
}

export function error(x: string): Result<Error, Err> {
  if(!x.startsWith("!!! "))  return err({message: "Must start with '!!! '"});
  const body = x.split(" ");
  const mess = body.slice(1).join(" ");
  if(!mess) return err({message: "Message required"});
  
  return ok({error_message: mess});
}

export function send(x: string): Result<Send, Err> {
  if(!x.startsWith("/send "))  return err({message: "Must start with '/send '"});
  const body = x.split(" ");
  const room = body[1];
  const key = body[2];
  if(!key || !room) return err({message: "room and key required"});

  const res = parseSome(key)
  if (res.ok) {
    return { ok: true, value: {room, key: res.value} }; 
  }
  return res;
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

export function message(x: string): Result<Message, Err> {
  if(!x.startsWith("/message "))  return err({message: "Must start with '/message '"});
  const body = x.split(" ");
  const id = body[1];
  const mess = body.slice(2).join(" ");
  if(!id || !mess) return err({message: "Id and message must be included"});

  return ok({mess, id});
}

function parseSome(inputString: string): Result<string, Err>{
  if (inputString.startsWith("Some(") && inputString.endsWith(")")) {
    return ok(inputString.substring(5, inputString.length - 1));
  }
  return err({message: "Invalid input format. Expected format: Some(<numeric_value>)"});
}