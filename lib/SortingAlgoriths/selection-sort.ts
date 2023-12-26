import { sleep } from "../utils";

export async function SelectionSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  color: string
) {
  for (let i = 0; i < arr.length; i++) {
    let smallest = i;
    arr[i].color = "blue";
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = "red";
      setArray([...arr]);
      if (arr[smallest].value > arr[j].value) {
        smallest = j;
      }

      arr[j].color = color;
      await sleep(speed);
    }
    let temp = arr[i];
    arr[i] = arr[smallest];
    arr[smallest] = temp;

    startTransition(() => {
      setArray([...arr]);
    });
  }
  setIsSorting(false);
}
