import { create } from "zustand";

export type Algorithms = "merge" | "bubble" | "count" | "quick" | "insertion";
type Options = {
  sortingAlgorithm: Algorithms;
  length: number;
  speed: number;
  color: string;
  leftToRightSound: string;
  rightToLeftSound: string;
};

type Actions = {
  setSortingAlgorithm: (sortingAlgorithm: Options["sortingAlgorithm"]) => void;
  setLength: (length: number) => void;
  setSpeed: (speed: number) => void;
  setColor: (color: string) => void;
  setLeftToRightSound: (sound: Options["leftToRightSound"]) => void;
  setRightToLeftSound: (sound: Options["rightToLeftSound"]) => void;
};

export const useStore = create<Options & Actions>((set) => ({
  sortingAlgorithm: "insertion",
  setSortingAlgorithm: (algo) => set(() => ({ sortingAlgorithm: algo })),
  length: 100,
  setLength: (length) => set(() => ({ length: length })),
  speed: 1000 /* Provide default speed value here */,
  setSpeed: (speed) => set(() => ({ speed: speed })),
  color: "#FFFFFF" /* Provide default color value here */,
  setColor: (color) => set(() => ({ color: color })),
  leftToRightSound: "1" /* Provide default leftToRightSound value here */,
  setLeftToRightSound: (sound) => set(() => ({ leftToRightSound: sound })),
  rightToLeftSound: "2" /* Provide default rightToLeftSound value here */,
  setRightToLeftSound: (sound) => set(() => ({ rightToLeftSound: sound })),
}));
