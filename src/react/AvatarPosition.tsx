import React from "react";
import Avatar from "./Avatar";

interface AvatarProps {
  id: string;
  order: number;
  count: number;
}

function window<T>(arr: Array<T>, f: (a: T, b: T) => boolean) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (f(arr[i], arr[i + 1])) {
      return i + 1;
    }
  }
  return undefined;
}

function hashCode(str: string) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export default function AvatarPosition({ id, order, count }: AvatarProps) {
  const steps = [0, 10, 32];
  const hash = Number.parseInt(id.slice(-3)) % 24;

  if (order === 1) {
    return <Avatar icon={hash} rotate={0} translateX={0} id={id} />;
  }

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

  return <Avatar icon={hash} rotate={rotate} translateX={translateX} id={id} />;
}
