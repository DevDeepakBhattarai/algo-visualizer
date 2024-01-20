"use client";
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useTransition,
} from "react";
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
    extraArray,
    setIsSorting,
    setExtraArray,
  } = useStore();
  useRandomArray();
  const [isPending, startTransition] = useTransition();
  const iterationSound: HTMLAudioElement = useMemo(
    () => new Audio(soundIterate + ".mp3"),
    [soundIterate]
  );
  const foundSound: HTMLAudioElement = useMemo(
    () => new Audio(soundElementFound + ".mp3"),
    [soundElementFound]
  );

  const swapSound: HTMLAudioElement = useMemo(
    () => new Audio(soundSwap + ".mp3"),
    [soundSwap]
  );
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
            iterationSound,
            swapSound,
            foundSound
          );
          break;
        case "count":
          CountSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            setExtraArray,
            extraArray,
            color,
            iterationSound,
            swapSound,
            foundSound
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
            iterationSound,
            swapSound,
            foundSound
          );
          break;
        case "merge":
          MergeSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            setExtraArray,
            color,
            iterationSound,
            swapSound,
            foundSound
          );
          break;
        case "quick":
          QuickSort(
            array,
            setArray,
            speed,
            startTransition,
            setIsSorting,
            setExtraArray,
            color,
            iterationSound,
            swapSound,
            foundSound
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
            iterationSound,
            swapSound,
            foundSound
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
