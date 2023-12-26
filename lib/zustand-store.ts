import { create } from "zustand";
import { generateRandomArray } from "./utils";

type Options = {
  array: Bar[];
  sortingAlgorithm: Algorithms | null;
  length: number;
  speed: number;
  color: string;
  soundIterate: Sound;
  soundSwap: Sound;
  soundElementFound: Sound;
  isSorting: boolean;
};

type Actions = {
  setArray: (array: Bar[]) => void;
  setSortingAlgorithm: (sortingAlgorithm: Options["sortingAlgorithm"]) => void;
  setLength: (length: number) => void;
  setSpeed: (speed: number) => void;
  setColor: (color: string) => void;
  setSoundIterate: (sound: Options["soundIterate"]) => void;
  setSoundSwap: (sound: Options["soundSwap"]) => void;
  setSoundElementFound: (sound: Options["soundElementFound"]) => void;
  setIsSorting: (bool: boolean) => void;
};

export const useStore = create<Options & Actions>((set) => ({
  array: [],
  setArray: (array: Options["array"]) => set(() => ({ array: array })),
  sortingAlgorithm: null,
  setSortingAlgorithm: (algo) => set(() => ({ sortingAlgorithm: algo })),
  length: 40,
  setLength: (length) => set(() => ({ length: length })),
  speed: 100 /* Provide default speed value here */,
  setSpeed: (speed) => set(() => ({ speed: speed })),
  color: "#FFFFFF" /* Provide default color value here */,
  setColor: (color) => set(() => ({ color: color })),
  soundIterate: "scale" /* Provide default leftToRightSound value here */,
  soundElementFound: "ding",
  soundSwap: "windchime",
  setSoundIterate: (sound) => set(() => ({ soundIterate: sound })),
  setSoundSwap: (sound) => set(() => ({ soundSwap: sound })),
  setSoundElementFound: (sound) => set(() => ({ soundElementFound: sound })),
  isSorting: false,
  setIsSorting: (bool: boolean) => set(() => ({ isSorting: bool })),
}));
