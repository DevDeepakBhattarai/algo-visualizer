"use client";
import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStore } from "@/lib/zustand-store";
import { generateRandomArray } from "@/lib/utils";
import { motion } from "framer-motion";
import useRandomArray from "@/hooks/useRandomArray";
interface Props {}

export default function Sort({}: Props): ReactElement {
  const { length, sortingAlgorithm, color, array, setArray } = useStore();
  useRandomArray();
  return (
    <div className="flex w-full gap-1 items-end">
      {array.map((bar, index) => {
        return (
          <motion.div
            key={bar.id}
            layoutId={bar.id}
            style={{
              backgroundColor: color,
              height: `${bar.value}rem`,
            }}
            className="flex-1 w-full rounded-sm"
          ></motion.div>
        );
      })}
    </div>
  );
}
