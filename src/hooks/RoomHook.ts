import { useState } from "react";

type RoomState = Err | Loading | Room;

type Err = string;

type Loading = boolean;

interface Room {
    id: number
}


export function count(def: number){


    const [count, setCount] = useState(def);

    const increase = () => setCount(count + 1);

    const decrease = () => setCount(count - 1);

    
}

