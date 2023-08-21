import React, { useState } from "react";
import { Button } from "@nextui-org/react";

export default function MyButton({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  return (
    <Button onClick={() => setCount(count + 1)}>
      {text}
      {count}
    </Button>
  );
}
