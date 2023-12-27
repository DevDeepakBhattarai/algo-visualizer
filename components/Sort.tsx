"use client";
import React, { ReactElement, useEffect, useTransition } from "react";
import { useStore } from "@/lib/zustand-store";
import useRandomArray from "@/hooks/useRandomArray";
import { BubbleSort } from "@/lib/SortingAlgoriths/bubble-sort";
import { InsertionSort } from "@/lib/SortingAlgoriths/insertion-sort";
import { MergeSort } from "@/lib/SortingAlgoriths/merge-sort";
import { QuickSort } from "@/lib/SortingAlgoriths/quick-sort";
import { CountSort } from "@/lib/SortingAlgoriths/count-sort";
import { SelectionSort } from "@/lib/SortingAlgoriths/selection-sort";
interface Props {}

export default function Sort({}: Props): ReactElement {
  const {
    sortingAlgorithm,
    setArray,
    soundElementFound,
    soundIterate,
    soundSwap,
    isSorting,
    color,
    array,
    speed,
    setIsSorting,
    setExtraArray,
  } = useStore();
  useRandomArray();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log(array);
  }, [array]);

  useEffect(() => {
    if (isSorting) {
      switch (sortingAlgorithm) {
        case "bubble":
          BubbleSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            color,
            soundIterate,
            soundSwap,
            soundElementFound
          );
          break;
        case "count":
          CountSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            color
          );
          break;
        case "insertion":
          InsertionSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            setExtraArray,
            color,
            soundIterate,
            soundSwap,
            soundElementFound
          );
          break;
        case "merge":
          MergeSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            color
          );
          break;
        case "quick":
          QuickSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            color
          );
          break;
        case "selection":
          SelectionSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            color,
            soundIterate,
            soundSwap,
            soundElementFound
          );
          break;
        default:
          break;
      }
    }
  }, [isSorting, setArray]);

  return (
    <div className="flex w-full gap-1 items-end h-full flex-1 place-self-end">
      {array.map((bar, index) => {
        return (
          <div
            key={sortingAlgorithm === "insertion" ? index : bar.id}
            style={{
              backgroundColor: bar.color,
              height: `${bar.value}%`,
            }}
            className="flex-1 w-full rounded-sm "
          ></div>
        );
      })}
    </div>
  );
}
