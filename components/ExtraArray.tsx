"use client";
import { useStore } from "@/lib/zustand-store";
import React, { ReactElement } from "react";
import { Badge } from "./ui/badge";

interface Props {}

export default function ExtraArray({}: Props): ReactElement {
  const { extraArray, setExtraArray, sortingAlgorithm } = useStore();
  if (sortingAlgorithm === "insertion")
    return (
      <div className="flex-1 h-1/2">
        <div className="h-full overflow-clip w-max px-10 border border-white rounded-sm">
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
      </div>
    );
  if (sortingAlgorithm === "count")
    return (
      <div className="flex flex-col w-full h-1/2 gap-1">
        <div className="space-x-2">
          <Badge>
            Highest Value :{" "}
            {extraArray.length - 1 > 0 ? extraArray.length - 1 : 0}
          </Badge>

          <Badge>Array Length : {extraArray.length}</Badge>
        </div>
        <div className="flex w-full gap-1 items-end h-full flex-1 place-self-end border px-2 border-white overflow-clip rounded-md">
          {extraArray.map((bar, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: bar.color,
                  height: "60%",
                }}
                className="flex-1 grid place-items-center text-xs w-full rounded-sm text-center text-black"
              >
                <span>{bar.value.toString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  else {
    return <></>;
  }
}
