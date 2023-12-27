"use client";
import { useStore } from "@/lib/zustand-store";
import React, { ReactElement } from "react";

interface Props {}

export default function ExtraArray({}: Props): ReactElement {
  const { extraArray, setExtraArray, sortingAlgorithm } = useStore();
  return sortingAlgorithm === "bubble" ||
    sortingAlgorithm === "selection" ||
    sortingAlgorithm === null ? (
    <></>
  ) : (
    <div className="place-self-start h-full overflow-clip w-max px-10 border border-white rounded-sm">
      <h1 className="text-base font-semibold text-white">Key</h1>
      {extraArray.map((bar, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "green",
              height: `${bar.value}%`,
              writingMode: "vertical-rl",
            }}
            className="flex-1 w-full rounded-sm text-center font-semibold text-black"
          >
            {bar.value.toString().substring(0, 4)}
          </div>
        );
      })}
    </div>
  );
}
