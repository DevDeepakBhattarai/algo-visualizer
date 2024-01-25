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
  const iterationSound = useRef<HTMLAudioElement>(null);
  const foundSound = useRef<HTMLAudioElement>(null);
  const swapSound = useRef<HTMLAudioElement>(null);

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
            iterationSound.current,
            swapSound.current,
            foundSound.current
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
            iterationSound.current,
            swapSound.current,
            foundSound.current
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
            iterationSound.current,
            swapSound.current,
            foundSound.current
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
            iterationSound.current,
            swapSound.current,
            foundSound.current
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
            iterationSound.current,
            swapSound.current,
            foundSound.current
          );
          break;
        default:
          break;
      }
    }
  }, [isSorting, setArray]);

  return (
    <div className="flex w-full gap-1 items-end h-full flex-1 place-self-end">
      <audio src={soundIterate + ".mp3"} className="invisible"></audio>
      <audio src={soundElementFound + ".mp3"} className="invisible"></audio>
      <audio src={soundSwap + ".mp3"} className="invisible"></audio>
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
