import { sleep } from "../utils";
import { useTransition } from "react";
export async function BubbleSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement,
  swapSound: HTMLAudioElement
) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    arr[i].color = "blue";

    if (i > 0) {
      arr[i - 1].color = color;
    }
    for (let j = i + 1; j < len; j++) {
      await iterationSound.play();
      arr[j].color = "red";
      setArray([...arr]);
      if (arr[i].value > arr[j].value) {
        await sleep(400);
        startTransition(async () => {
          arr[j].color = "blue";
          arr[i].color = "red";
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          arr[j].color = "red";
          await swapSound.play();
        });
      }
      await sleep(speed);

      if (arr[i].value <= arr[j].value) {
        arr[j].color = color;
      }
    }
  }

  arr[len - 1].color = color;
  arr[len - 2].color = color;
  setArray([...arr]);
  setIsSorting(false);
  return arr;
}
