import { sleep } from "../utils";

export async function CountSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  setExtraArray: (arr: Bar[]) => void,
  extraArray: Bar[],
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement,
  swapSound: HTMLAudioElement
) {
  const largestIndex = await findLargestIndex(
    arr,
    setArray,
    speed,
    color,
    iterationSound,
    foundSound
  );
  arr[largestIndex].color = color;
  arr[arr.length - 1].color = color;
  startTransition(() => {
    setArray([...arr]);
  });

  const countArr = await makeCopyArray(
    arr,
    largestIndex,
    color,
    startTransition,
    setExtraArray
  );

  await copyToMadeArray(
    arr,
    countArr,
    setExtraArray,
    startTransition,
    speed,
    color,
    iterationSound,
    foundSound
  );
  let j = 0;
  let i = 0;

  while (j < countArr.length) {
    if (j < countArr.length) {
      countArr[j].color = "red";
    }
    if (j > 0) {
      countArr[j - 1].color = color;
    }

    if (i > 0) {
      arr[i - 1].color = color;
    }
    setArray([...arr]);
    setExtraArray([...countArr]);
    await sleep(speed);

    if (countArr[j].value === 0) {
      await iterationSound.play();
      j++;
    } else if (countArr[j].value > 0) {
      await swapSound.play();
      countArr[j].color = "green";
      arr[i].value = j;
      arr[i].color = "green";
      countArr[j].value--;
      await sleep(100);
      i++;
      setExtraArray([...countArr]);
      setArray([...arr]);

      await sleep(speed);
    }
  }
  startTransition(() => {
    countArr[j - 1].color = color;
    setExtraArray([...countArr]);
  });
  setIsSorting(false);
}

async function makeCopyArray(
  arr: Bar[],
  index: number,
  color: string,
  startTransition: React.TransitionStartFunction,
  setExtraArray: (arr: Bar[]) => void
) {
  const countArr: Bar[] = new Array(Math.ceil(arr[index].value) + 1);
  const pseudoBar = { value: 0, color };
  for (let i = 0; i < countArr.length; i++) {
    countArr[i] = structuredClone({ ...pseudoBar, id: crypto.randomUUID() });
  }

  startTransition(() => {
    setExtraArray([...countArr]);
  });

  return countArr;
}

async function copyToMadeArray(
  arr: Bar[],
  countArr: Bar[],
  setExtraArray: (arr: Bar[]) => void,
  startTransition: React.TransitionStartFunction,
  speed: number,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement
) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].color = "red";

    if (i > 1) {
      arr[i - 1].color = color;
    }

    await iterationSound.play();
    countArr[arr[i].value].color = "green";
    startTransition(() => {
      setExtraArray([...countArr]);
    });
    await sleep(speed);

    countArr[arr[i].value] = structuredClone({
      value: countArr[arr[i].value].value + 1,
      color: "green",
      id: "id",
    });
    await foundSound.play();
    await sleep(speed);
    startTransition(() => {
      setExtraArray([...countArr]);
      countArr[arr[i].value].color = color;
      arr[i].color = color;
    });
  }
}

async function findLargestIndex(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  color: string,
  iterationSound: HTMLAudioElement,
  foundSound: HTMLAudioElement
) {
  let largest = 0;
  for (let i = 0; i < arr.length; i++) {
    arr[i].color = "red";
    await iterationSound.play();
    if (i > 1) {
      arr[i - 1].color = color;
    }

    setArray([...arr]);
    await sleep(speed);
    if (arr[i].value > arr[largest].value) {
      await foundSound.play();
      arr[largest].color = color;
      largest = i;
    }
    arr[largest].color = "green";
    arr[i].color = color;
  }
  return largest;
}
