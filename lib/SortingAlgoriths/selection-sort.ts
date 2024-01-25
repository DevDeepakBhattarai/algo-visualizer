import { sleep } from "../utils";

export async function SelectionSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  color: string,
  iterationSound: HTMLAudioElement | null,
  foundSound: HTMLAudioElement | null,
  swapSound: HTMLAudioElement | null
) {
  await iterationSound?.play();

  await sleep(1000);
  for (let i = 0; i < arr.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = "blue";
      arr[j].color = "red";

      if (j > 1) {
        arr[j - 1].color = color;
      }
      setArray([...arr]);

      if (arr[smallest].value > arr[j].value) {
        arr[smallest].color = color;
        smallest = j;
        await sleep(300);
        await foundSound?.play();
      }
      arr[smallest].color = "green";
      await iterationSound?.play();
      await sleep(speed);
      if (arr[smallest].value <= arr[j].value) {
        arr[j].color = color;
      }
    }

    startTransition(() => {
      arr[i].color = color;
      arr[smallest].color = color;
      let temp = arr[i];
      arr[i] = arr[smallest];
      arr[smallest] = temp;
      swapSound?.play();
      setArray([...arr]);
    });
  }
  setIsSorting(false);
}
