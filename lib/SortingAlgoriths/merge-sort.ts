import { RawNodeDatum } from "react-d3-tree";
import { sleep } from "../utils";

export async function MergeSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  setTreeData: React.Dispatch<React.SetStateAction<RawNodeDatum[]>>,
  data: RawNodeDatum[],
  extraArray: Bar[],
  setExtraArray: (arr: Bar[]) => void,
  color: string,
  iterationSound: HTMLAudioElement | null,
  foundSound: HTMLAudioElement | null,
  swapSound: HTMLAudioElement | null
) {
  await iterationSound?.play();
  setIsSorting(true);
  await sorter(arr, 0, arr.length - 1);
  setIsSorting(false);
  async function merge(A: Bar[], low: number, high: number, mid: number) {
    let i,
      j,
      k = low; // if k = low; then we dont have to use A[i]= B[i-low] when copying element back to array A.
    i = low;
    j = mid + 1;

    while (i <= mid && j <= high) {
      await iterationSound?.play();
      A[i].color = "red";
      A[j].color = "blue";
      setArray([...A]);
      await sleep(speed);
      if (A[i].value < A[j].value) {
        A[i].color = "green";
        extraArray[k] = structuredClone(A[i]);
        await swapSound?.play();
        k++;
        i++;
        await sleep(speed);
        setExtraArray([...extraArray]);
        setArray([...A]);
        await sleep(speed);
      } else {
        A[j].color = "green";
        extraArray[k] = structuredClone(A[j]);
        await swapSound?.play();

        k++;
        j++;
        setArray([...A]);
        await sleep(speed);

        setExtraArray([...extraArray]);
        await sleep(speed);
      }

      if (A[i - 1]) A[i - 1].color = color;
      if (A[j - 1]) A[j - 1].color = color;
      setArray([...A]);
    }

    while (i <= mid) {
      await swapSound?.play();

      A[i].color = "green";
      extraArray[k] = structuredClone(A[i]);
      setArray([...A]);
      setExtraArray([...extraArray]);
      await sleep(speed);
      k++;
      i++;
    }

    while (j <= high) {
      await swapSound?.play();

      A[j].color = "green";
      extraArray[k] = structuredClone(A[j]);
      setExtraArray([...extraArray]);
      setArray([...A]);
      await sleep(speed);
      k++;
      j++;
    }

    if (A[i - 1]) A[i - 1].color = color;
    if (A[j - 1]) A[j - 1].color = color;

    for (let i = low; i <= high; i++) {
      await foundSound?.play();
      extraArray[i].color = "red";
      setExtraArray([...extraArray]);
      A[i] = structuredClone(extraArray[i]); // We use B[i-low] because. When we have for example low=3 and high=4 , during the second last step of the tree i.e we combine |3| & |0| to make |0,3| ( <--this is B) we wont have the index 3 available to us. So we need to offset it .
      await sleep(speed);
      extraArray[i].color = color;
      A[i].color = color;
      startTransition(() => {
        setExtraArray([...extraArray]);
      });
      setArray([...A]);
    }
    await sleep(500);
  }

  async function sorter(A: Bar[], low: number, high: number) {
    if (low < high) {
      let mid = Math.floor(low + (high - low) / 2);
      await sorter(A, low, mid);
      await sorter(A, mid + 1, high);
      await merge(A, low, high, mid);
    }
  }
}
