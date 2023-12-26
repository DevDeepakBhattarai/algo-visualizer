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
import { useStore } from "@/lib/zustand-store";
import { useToast } from "./ui/use-toast";
export default function Component() {
  const {
    setColor,
    setLength,
    setSoundIterate,
    setSoundElementFound,
    setSoundSwap,
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
                onValueChange={(value: Algorithms) => {
                  setSortingAlgorithm(value);
                }}
              >
                <SelectTrigger id="algorithm">
                  <SelectValue placeholder="Select an algorithm"></SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bubble">Bubble Sort</SelectItem>
                  <SelectItem value="selection">Selection Sort</SelectItem>
                  <SelectItem value="quick" disabled>
                    Quick Sort
                  </SelectItem>
                  <SelectItem value="merge" disabled>
                    Merge Sort
                  </SelectItem>
                  <SelectItem value="count" disabled>
                    Count Sort
                  </SelectItem>
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
                  Speed (iteration/ms)
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
                max={1000}
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
                Sound - Iterate
              </Label>
              <Select
                defaultValue="scale"
                onValueChange={(value) => {
                  setSoundIterate(value as Sound);
                }}
              >
                <SelectTrigger id="iterateSound">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ding">Ding</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="windchime">Windchime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="soundLeftToRight">
                Sound - Swap
              </Label>
              <Select
                defaultValue="ding"
                onValueChange={(value) => {
                  setSoundSwap(value as Sound);
                }}
              >
                <SelectTrigger id="swapSound">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ding">Ding</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="windchime">Windchime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <Label className="mb-2 font-medium" htmlFor="soundRightToLeft">
                Sound - Element Found
              </Label>

              <Select
                defaultValue="windchime"
                onValueChange={(value) => {
                  setSoundElementFound(value as Sound);
                }}
              >
                <SelectTrigger id="elementFoundSound">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="ding">Ding</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="windchime">Windchime</SelectItem>
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
  const { isSorting, setIsSorting, sortingAlgorithm } = useStore();
  const { toast } = useToast();
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
          if (!sortingAlgorithm) {
            toast({
              title: "Please select an algorithm",
              variant: "destructive",
            });
            return;
          }
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
