import { useState, useEffect } from "react";
import Ws, { ReadyState } from "./WebSocket";
import WebRTCContainer from "./WebRTCContainer";
import type { Result } from "./Result";
import { JsonStructiure, parseDirectIdJSON } from "./Parsers";

export interface Err {
  message: string
}

export default function useWebRTC<T>(id: string) {
  
}