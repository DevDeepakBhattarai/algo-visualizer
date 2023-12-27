import { sleep } from "../utils";

export async function InsertionSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  color: string,
  soundIterate: Sound,
  soundSwap: Sound,
  soundElementFound: Sound
) {
  const iterationSound = new Audio(soundIterate + ".mp3");
  const swapSound = new Audio(soundSwap + ".mp3");
  const foundSound = new Audio(soundElementFound + ".mp3");
  await sleep(1000);
  for (let i = 1; i < arr.length; i++) {
    let key = structuredClone(arr[i]);
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
  setIsSorting(false);
}
// arr=[{value:3},{value:5},{value:4},{value:1},{value:2},{value:7}]
