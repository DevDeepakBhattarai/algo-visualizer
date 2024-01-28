import { startTransition } from "react";
import { sleep } from "../utils";
import { RawNodeDatum } from "react-d3-tree";

export async function QuickSort(
  arr: Bar[],
  setArray: (arr: Bar[]) => void,
  speed: number,
  startTransition: React.TransitionStartFunction,
  setIsSorting: (bool: boolean) => void,
  setTreeData: React.Dispatch<React.SetStateAction<RawNodeDatum[]>>,
  data: RawNodeDatum[],
  color: string,
  iterationSound: HTMLAudioElement | null,
  foundSound: HTMLAudioElement | null,
  swapSound: HTMLAudioElement | null
) {
  await iterationSound?.play();

  const id = data[0].attributes!.id as string;

  const low = 0,
    high = arr.length - 1;
  await sorter(id, low, high);
  setIsSorting(false);

  // Helper functions

  function updateChildren(
    node: RawNodeDatum,
    parentId: string,
    child: { bar: Bar[]; id: string }[]
  ) {
    if (
      node.attributes!.id === parentId &&
      node.children &&
      node.children.length <= 3
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
          updateChildren(node.children[0], parentId, child);
        if (
          node.children[1] &&
          (JSON.parse(node.children[1].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildren(node.children[1], parentId, child);
        if (
          node.children[2] &&
          (JSON.parse(node.children[2].attributes!.array as string) as number[])
            .length > 1
        )
          updateChildren(node.children[2], parentId, child);
      }
    }
  }
  async function sorter(parentId: string, low: number, high: number) {
    if (low < high) {
      let position = await partition(arr, low, high);
      const child1 = arr.slice(low, position);
      const child2 = [arr[position]];
      const child3 = arr.slice(position + 1, high + 1);
      const child1Id = crypto.randomUUID();
      const child2Id = crypto.randomUUID();
      const child3Id = crypto.randomUUID();
      const childArray = [
        { bar: child1, id: child1Id },
        { bar: child2, id: child2Id },
        { bar: child3, id: child3Id },
      ];
      updateChildren(data[0], parentId, childArray);

      await sorter(child1Id, low, position - 1);

      await sorter(child3Id, position + 1, high);
    }
  }

  async function partition(
    A: Bar[],
    low: number,
    high: number
    // treeId: string,
  ) {
    let i = low + 1,
      j = high;
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
        await iterationSound?.play();
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

      while (A[j].value > pivot.value) {
        await iterationSound?.play();

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
        await swapSound?.play();
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
    await swapSound?.play();
    if (i < high) A[i].color = color;
    if (j >= low) A[j].color = color;
    temp = structuredClone(A[j]);
    A[j] = structuredClone(A[low]);
    A[low] = structuredClone(temp);
    setArray([...A]);
    await sleep(speed);

    return j;
  }
}
