import { create } from "zustand";
import { generateRandomArray } from "./utils";

export type Algorithms = "merge" | "bubble" | "count" | "quick" | "insertion";
type Options = {
  array: Bar[];
  sortingAlgorithm: Algorithms;
  length: number;
  speed: number;
  color: string;
  leftToRightSound: string;
  rightToLeftSound: string;
  isSorting: boolean;
};

type Actions = {
  setArray: (array: Bar[]) => void;
  setSortingAlgorithm: (sortingAlgorithm: Options["sortingAlgorithm"]) => void;
  setLength: (length: number) => void;
  setSpeed: (speed: number) => void;
  setColor: (color: string) => void;
  setLeftToRightSound: (sound: Options["leftToRightSound"]) => void;
  setRightToLeftSound: (sound: Options["rightToLeftSound"]) => void;
  setIsSorting: (bool: boolean) => void;
};

export const useStore = create<Options & Actions>((set) => ({
  array: [],
  setArray: (array: Options["array"]) => set(() => ({ array: array })),
  sortingAlgorithm: "insertion",
  setSortingAlgorithm: (algo) => set(() => ({ sortingAlgorithm: algo })),
  length: 100,
  setLength: (length) => set(() => ({ length: length })),
  speed: 100 /* Provide default speed value here */,
  setSpeed: (speed) => set(() => ({ speed: speed })),
  color: "#FFFFFF" /* Provide default color value here */,
  setColor: (color) => set(() => ({ color: color })),
  leftToRightSound: "1" /* Provide default leftToRightSound value here */,
  setLeftToRightSound: (sound) => set(() => ({ leftToRightSound: sound })),
  rightToLeftSound: "2" /* Provide default rightToLeftSound value here */,
  setRightToLeftSound: (sound) => set(() => ({ rightToLeftSound: sound })),
  isSorting: false,
  setIsSorting: (bool: boolean) => set(() => ({ isSorting: bool })),
}));
