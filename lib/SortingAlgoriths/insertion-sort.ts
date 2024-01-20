import { sleep } from "../utils";

export async function InsertionSort(
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
  for (let i = 1; i < arr.length; i++) {
    let key = structuredClone(arr[i]);
    setExtraArray([key]);
    for (var j = i - 1; j >= 0; j--) {
      await iterationSound.play();
      arr[i].color = "blue";
      arr[j].color = "red";
      arr[j + 1] = structuredClone(arr[j]);
      arr[j].color = color;
      setArray([...arr]);
      await sleep(speed);
      arr[j + 1].color = color;
      if (arr[j].value < key.value) {
        break;
      }
    }
    await swapSound.play();
    startTransition(async () => {
      arr[j + 1] = structuredClone(key);
      arr[i].color = color;
      setArray([...arr]);
    });
  }
  setExtraArray([]);
  setIsSorting(false);
}
