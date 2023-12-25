import { Value } from "@radix-ui/react-select";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Bar = {
  value: Number;
  id: string;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomArray(
  length: number,
  maxValue: number,
  minValue: number
) {
  const arr: Bar[] = Array.from({ length }, () => ({
    value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
    id: crypto.randomUUID(),
  }));
  return arr;
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
