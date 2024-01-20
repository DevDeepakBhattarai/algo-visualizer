import { startTransition } from "react";
import { sleep } from "../utils";

export async function QuickSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  setExtraArray: (arr: Bar[]) => void,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement,
  swapSound: HTMLAudioElement
) {
  const low = 0,
    high = arr.length - 1;
  await sorter(
    arr,
    setArray,
    speed,
    startTransition,
    setIsSorting,
    setExtraArray,
    low,
    high,
    color,
    iterationSound,
    foundSound,
    swapSound
  );
  setIsSorting(false);
}

async function sorter(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  setExtraArray: (arr: Bar[]) => void,
  low: number,
  high: number,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement,
  swapSound: HTMLAudioElement
) {
  if (low < high) {
    let position = await partition(
      arr,
      low,
      high,
      setArray,
      speed,
      color,
      iterationSound,
      foundSound,
      swapSound
    );
    await sorter(
      arr,
      setArray,
      speed,
      startTransition,
      setIsSorting,
      setExtraArray,
      low,
      position - 1,
      color,
      iterationSound,
      foundSound,
      swapSound
    );
    await sorter(
      arr,
      setArray,
      speed,
      startTransition,
      setIsSorting,
      setExtraArray,
      position + 1,
      high,
      color,
      iterationSound,
      foundSound,
      swapSound
    );
  }
}
async function partition(
  A: Bar[],
  low: number,
  high: number,
  setArray: (arr: Bar[]) => void,
  speed: number,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement,
  swapSound: HTMLAudioElement
) {
  let i = low + 1,
    j = high;
  console.log("Quick Sort");
  let pivot = A[low];
  pivot.color = "purple";
  let temp: Bar = {
    value: 0,
    color: "",
    id: "",
  };
  do {
    // This i <=high is so that we don't go out of array index .
    //if we don't want to use this i<=high we have make n+1 length array and put infinity as the last element there

    while (i <= high && A[i].value <= pivot.value) {
      await iterationSound.play();
      i++;
      if (i < high) A[i].color = "red";
      if (i > low) {
        A[i - 1].color = color;
      }
      setArray([...A]);
      await sleep(speed);
    }
    // A[i].color = "green";
    // startTransition(() => {
    //   setArray([...A]);
    // });
    // await sleep(speed);

    // A[i].color = "red";
    // startTransition(() => {
    //   setArray([...A]);
    // });

    // Here we are finding element <=pivot so if we have the smallest element in the first . j will just stop there. as we have equal and not go outside of the array.
    while (A[j].value > pivot.value) {
      await iterationSound.play();

      j--;
      if (j > low) A[j].color = "blue";

      if (j < high && A[j + 1].color !== "red") {
        A[j + 1].color = color;
      }
      startTransition(() => {
        setArray([...A]);
      });
      await sleep(speed);
    }

    await sleep(speed * 3);
    // A[j].color = "green";
    // startTransition(() => {
    //   setArray([...A]);
    // });
    // await sleep(speed);
    // A[j].color = "blue";
    // startTransition(() => {
    //   setArray([...A]);
    // });

    if (i < j) {
      await swapSound.play();
      A[i].color = "blue";
      A[j].color = "red";
      temp = structuredClone(A[i]);
      A[i] = structuredClone(A[j]);
      A[j] = structuredClone(temp);
      startTransition(() => {
        setArray([...A]);
      });
      await sleep(400);
    }
  } while (j >= i);
  await sleep(speed * 3);
  pivot.color = color;
  await swapSound.play();
  if (i < high) A[i].color = color;
  if (j >= low) A[j].color = color;
  temp = structuredClone(A[j]);
  A[j] = structuredClone(A[low]);
  A[low] = structuredClone(temp);
  setArray([...A]);
  await sleep(speed);

  return j;
}
