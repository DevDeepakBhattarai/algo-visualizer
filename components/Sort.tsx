"use client";
import React, { ReactElement, useEffect, useTransition } from "react";
import { useStore } from "@/lib/zustand-store";
import useRandomArray from "@/hooks/useRandomArray";
import { BubbleSort } from "@/lib/SortingAlgoriths/bubble-sort";
interface Props {}

export default function Sort({}: Props): ReactElement {
  const {
    sortingAlgorithm,
    setArray,
    isSorting,
    color,
    array,
    speed,
    setIsSorting,
  } = useStore();
  useRandomArray();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSorting) {
      BubbleSort(array, setArray, speed, startTransition, setIsSorting, color);
    }
  }, [isSorting, setArray]);

  return (
    <div className="flex w-full gap-1 items-end">
      {array.map((bar, index) => {
        return (
          <div
            key={bar.id}
            // layoutId={bar.id}
            style={{
              backgroundColor: bar.color,
              height: `${bar.value}rem`,
            }}
            className="flex-1 w-full rounded-sm"
          ></div>
        );
      })}
    </div>
  );
}
