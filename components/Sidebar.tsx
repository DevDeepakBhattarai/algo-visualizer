"use client";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Algorithms, useStore } from "@/lib/zustand-store";
export default function Component() {
  const {
    setColor,
    setLeftToRightSound,
    setLength,
    setRightToLeftSound,
    setSortingAlgorithm,
    setSpeed,

    length,
    speed,
  } = useStore();

  return (
    <main className="flex-row flex">
      <aside className="max-w-4xl p-4 lg:p-6 lg:ring-white lg:ring-1 shadow h-max lg:h-screen">
        <div className="flex flex-col gap-6">
          <div className="border-b pb-4">
            <h1 className=" text-xl lg:text-2xl font-semibold">
              Sorting Algorithm Visualizer
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="algorithm">
                Sorting Algorithm
              </Label>
              <Select
                defaultValue={"bubble"}
                onValueChange={(value: Algorithms) => {
                  setSortingAlgorithm(value);
                }}
              >
                <SelectTrigger id="algorithm">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bubble">Bubble Sort</SelectItem>
                  <SelectItem value="quick">Quick Sort</SelectItem>
                  <SelectItem value="merge">Merge Sort</SelectItem>
                  <SelectItem value="count">Count Sort</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <Label className="mb-2 font-medium" htmlFor="arrayLength">
                  Array Length
                </Label>

                <Label className="mb-2 font-medium" htmlFor="arrayLength">
                  {length}
                </Label>
              </div>

              <Slider
                onValueChange={(value) => {
                  setLength(value[0]);
                }}
                value={[length]}
                className="w-full"
                id="arrayLength"
                max={100}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <Label className="mb-2 font-medium" htmlFor="speed">
                  Speed (shift/ms)
                </Label>

                <Label className="mb-2 font-medium" htmlFor="speed">
                  {speed}
                </Label>
              </div>

              <Slider
                onValueChange={(value) => {
                  setSpeed(value[0]);
                }}
                className="w-full"
                id="speed"
                value={[speed]}
                max={5000}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="color">
                Color
              </Label>
              <Input
                onChange={(e) => {
                  setColor(e.target.value);
                }}
                className="w-full h-10"
                id="color"
                type="color"
                defaultValue={"#FFFFFF"}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="soundLeftToRight">
                Sound - Left to Right
              </Label>
              <Select
                onValueChange={(value) => {
                  setLeftToRightSound(value);
                }}
              >
                <SelectTrigger id="algorithm">
                  <SelectValue placeholder="Select Algorithm" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bubble">1</SelectItem>
                  <SelectItem value="quick">2</SelectItem>
                  <SelectItem value="merge">3</SelectItem>
                  <SelectItem value="heap">4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="soundRightToLeft">
                Sound - Right to Left
              </Label>

              <Select
                onValueChange={(value) => {
                  setRightToLeftSound(value);
                }}
              >
                <SelectTrigger id="algorithm">
                  <SelectValue placeholder="Select Algorithm" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bubble">1</SelectItem>
                  <SelectItem value="quick">2</SelectItem>
                  <SelectItem value="merge">3</SelectItem>
                  <SelectItem value="heap">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden lg:block">
              <UtilityButtons></UtilityButtons>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-grow bg-white shadow rounded-lg" />
    </main>
  );
}

export function UtilityButtons() {
  const { isSorting, setIsSorting } = useStore();
  return (
    <div className="flex justify-between">
      <Button
        className="mt-4"
        disabled={!isSorting}
        onClick={() => {
          setIsSorting(false);
        }}
        variant={"outline"}
      >
        Stop
      </Button>
      <Button
        onClick={() => {
          setIsSorting(true);
        }}
        disabled={isSorting}
        className="mt-4"
      >
        Start
      </Button>
    </div>
  );
}
