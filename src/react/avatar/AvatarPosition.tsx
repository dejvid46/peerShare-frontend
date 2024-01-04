import React from "react";
import Avatar from "./Avatar";

interface AvatarProps {
  id: string;
  order: number;
  count: number;
  mess?: string;
}

function window<T>(arr: Array<T>, f: (a: T, b: T) => boolean) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (f(arr[i], arr[i + 1])) {
      return i + 1;
    }
  }
  return undefined;
}

export default function AvatarPosition({
  id,
  order,
  count,
  mess,
}: AvatarProps) {
  const steps = [0, 10, 32];

  const step = window(steps, (a, b) => a <= order - 1 && order - 1 <= b);

  const maxStep = window(steps, (a, b) => a <= count - 1 && count - 1 <= b);

  if (!step || !maxStep) {
    return <></>;
  }

  const positionInCircle = order - 1 - steps[step - 1];

  const circleSize =
    maxStep === step
      ? count - 1 - steps[step - 1]
      : steps[step] - steps[step - 1];
  const rotate = (360 / circleSize) * positionInCircle + 270;
  const translateX = step * 200;

  return <Avatar rotate={rotate} translateX={translateX} id={id} text={mess} />;
}
