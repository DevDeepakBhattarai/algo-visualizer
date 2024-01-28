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
  const parentId = data[0].attributes!.id as string;
  await sorter(arr, 0, arr.length - 1, parentId);
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
        if (A[i - 1]) A[i - 1].color = color;

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
        if (A[j - 1]) A[j - 1].color = color;

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
      if (A[i - 1]) A[i - 1].color = color;

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
      if (A[j - 1]) A[j - 1].color = color;

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

  async function sorter(A: Bar[], low: number, high: number, parentId: string) {
    if (low < high) {
      let mid = Math.floor(low + (high - low) / 2);
      const child1 = arr.slice(low, mid + 1);
      const child2 = arr.slice(mid + 1, high + 1);
      const child1Id = crypto.randomUUID();
      const child2Id = crypto.randomUUID();

      const childArray = [
        { bar: child1, id: child1Id },
        { bar: child2, id: child2Id },
      ];

      updateChildrenTTD(data[0], parentId, childArray);
      await sorter(A, low, mid, child1Id);
      await sorter(A, mid + 1, high, child2Id);
      await merge(A, low, high, mid);
      updateChildrenDTT(data[0], parentId, A.slice(low, high + 1));
    }
  }

  function updateChildrenTTD( // updateChildrenTopToDown , when we move from top of the tree to bottom initially while dividing the array into two part every time, we update the array attribute in this process
    node: RawNodeDatum,
    parentId: string,
    child: { bar: Bar[]; id: string }[]
  ) {
    if (
      node.attributes &&
      node.attributes.id === parentId &&
      node.children &&
      node.children.length < 2
    ) {
      child.forEach((individualChild) => {
        individualChild.bar.length > 0 &&
          node.children?.push({
            name: "root",
            attributes: {
              array: JSON.stringify(
                individualChild.bar.map((bar) => bar.value)
              ),
              id: individualChild.id,
            },
            children: [],
          });
      });

      setTreeData([...data]);
    } else {
      if (node.children && node.children.length > 0) {
        if (
          node.children[0] &&
          (JSON.parse(node.children[0].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildrenTTD(node.children[0], parentId, child);

        if (
          node.children[1] &&
          (JSON.parse(node.children[1].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildrenTTD(node.children[1], parentId, child);
      }
    }
  }

  function updateChildrenDTT(
    node: RawNodeDatum,
    parentId: string,
    newArray: Bar[]
  ) {
    if (node.attributes && node.attributes.id === parentId) {
      node.attributes.newArray = JSON.stringify(
        newArray.map((bar) => bar.value)
      );
      setTreeData([...data]);
    } else {
      if (node.children && node.children.length > 0) {
        if (
          node.children[0] &&
          (JSON.parse(node.children[0].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildrenDTT(node.children[0], parentId, newArray);
        if (
          node.children[1] &&
          (JSON.parse(node.children[1].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildrenDTT(node.children[1], parentId, newArray);
      }
    }
  }
}
