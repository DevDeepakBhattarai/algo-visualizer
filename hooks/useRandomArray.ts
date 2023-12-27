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
  const { length, setArray, color, array } = useStore();
  const timer: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setArray(generateRandomArray(length, color));
    }, 750);
    timer.current = timeout;
    return () => {
      clearTimeout(timer.current);
    };
  }, [length]);

  useEffect(() => {
    if (array.length > 0) {
      const timeout = setTimeout(() => {
        const newArray = array.map((bar) => ({ ...bar, color: color }));
        setArray(newArray);
      }, 750);
      timer.current = timeout;
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [color]);

  return null;
}
