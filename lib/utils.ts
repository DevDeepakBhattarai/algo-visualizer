import { Value } from "@radix-ui/react-select";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomArray(length: number, color: string) {
  const arr: Bar[] = Array.from({ length }, () => ({
    value: Math.random() * 99 + 1,
    id: crypto.randomUUID(),
    color: color,
  }));
  return arr;
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
