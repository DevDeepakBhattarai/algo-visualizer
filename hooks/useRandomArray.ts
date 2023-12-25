import { generateRandomArray } from "@/lib/utils";
import { useStore } from "@/lib/zustand-store";
import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {}

export default function useRandomArray() {
  const { length, setArray } = useStore();
  const timer: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setArray(generateRandomArray(length, 5, 40));
    }, 750);
    timer.current = timeout;
    return () => {
      clearTimeout(timer.current);
    };
  }, [length]);

  return null;
}
