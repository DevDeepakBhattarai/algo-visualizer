"use client";
import React, { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Button } from "./ui/button";
import { useStore } from "@/lib/zustand-store";

interface Props {}

export function Hints({}: Props): ReactElement {
  return <DrawerDialogSelector></DrawerDialogSelector>;
}

function InsightSelector() {
  const { sortingAlgorithm } = useStore();

  return (
    <>
      {sortingAlgorithm === "bubble" && <BubbleSort />}
      {sortingAlgorithm === "selection" && <SelectionSort />}
      {sortingAlgorithm == "count" && <CountSort />}
      {sortingAlgorithm == "insertion" && <InsertionSort />}
      {sortingAlgorithm == "quick" && <QuickSort />}
      {sortingAlgorithm == "merge" && <MergeSort />}
    </>
  );
}

function DrawerDialogSelector() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { sortingAlgorithm } = useStore();
  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger disabled={sortingAlgorithm === null}>
          <Button disabled={sortingAlgorithm === null} variant={"outline"}>
            Insights
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Color Indicators</DialogTitle>
            <DialogDescription className="p-4">
              <InsightSelector></InsightSelector>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger asChild disabled={sortingAlgorithm === null}>
        <Button disabled={sortingAlgorithm === null} variant={"outline"}>
          Insights
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Color Indicators</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <InsightSelector></InsightSelector>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BubbleSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          When the bar turns red, it signifies the active iteration of the
          algorithm, highlighting the current element under consideration.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white">
          The blue colors indicates the specific position where a swap is about
          to occur, providing a visual cue for the impending rearrangement of
          elements.
        </span>
      </div>
    </div>
  );
}
function SelectionSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          When the bar turns red, it signifies the active iteration of the
          algorithm, highlighting the current element under consideration.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[green]" />
        <span className="text-white">
          The green color marks the smallest element found up to the current
          iteration. It serves as a visual indicator of the element that will be
          selected and moved to its correct position during the sorting process.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white">
          The blue colors indicates the specific position where a swap is about
          to occur, providing a visual cue for the impending rearrangement of
          elements.
        </span>
      </div>
    </div>
  );
}
function CountSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          When the bar turns red, it signifies the active iteration of the
          algorithm, highlighting the current element under consideration.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white">
          The blue color marks the largest element found up to the current
          iteration. It serves as a visual indicator of the element that will be
          used to make the count array.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[green]" />
        <span className="text-white space-y-1">
          It indicates that count in the count array is increasing when we are
          iterating the main array and decreasing when we are iterating the
          count array
        </span>
      </div>
    </div>
  );
}
function InsertionSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          When the bar turns red, it signifies the active iteration of the
          algorithm, highlighting the current element under consideration.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white">
          The blue color marks the the index of the bar(key) which is being
          inserted in the left sorted array.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[green]" />
        <span className="text-white space-y-1">
          It indicates the bar(key) that is being inserted in the sorted array
        </span>
      </div>
    </div>
  );
}

function QuickSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[purple]" />
        <span className="text-white">
          Purple Color Marks the pivot element, which is placed at its final
          position in the final sorted array after the partitioning step.It
          helps split the array into two.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          When the bars turn red, it signifies the leftward iteration in search
          of an element larger than the pivot during the partitioning step.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white space-y-1">
          The blue color indicates the rightward iteration, where the algorithm
          looks for elements smaller than the pivot during the partitioning
          step.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm" />
        <span className="text-white space-y-1">
          There is a tree visualization above the main array where the left
          child indicates the left subarray, middle child indicates the pivot
          element in its final position , right child indicates the right
          subarray
        </span>
      </div>
    </div>
  );
}
function MergeSort() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[purple]" />
        <span className="text-white">
          The bars temporarily turn purple, indicating the midpoint of the array
          during the splitting phase. This visual cue highlights the division of
          the array into two subarrays as part of the merging process.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[red]" />
        <span className="text-white">
          During the merging process, the bars turn red when iterating through
          the left subarray.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[blue]" />
        <span className="text-white">
          During the merging process, the bars turn blue when iterating through
          the right subarray.
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm bg-[green]" />
        <span className="text-white space-y-1">
          <p>
            The bar temporarily turns into green color,it serves as a indicator
            that the corresponding bar is inserted in the merged array to get a
            sorted merged array.
          </p>
          <p>
            The merged array is than again copied back to the main array which
            is indicated by the iteration of the merged array which is shown
            above the main array.
          </p>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 aspect-square rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90 h-8 w-8"
            viewBox="0 0 64 64"
            id="graph"
          >
            <g fill="white">
              <path d="M15.8 40.1c-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.9-7.9 7.9 3.5 7.9 7.9c0 4.3-3.5 7.9-7.9 7.9zm0-12.9c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9c0-2.6-2.2-4.9-4.9-4.9zM47.9 24c-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.9-7.9 7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9zm0-12.8c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 44.9c-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.9-7.9 7.9 3.5 7.9 7.9-3.6 7.9-7.9 7.9zm0-12.8c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9z"></path>
              <path d="M41.4 46.8 20.8 36.5l1.4-2.9 20.7 10.3-1.5 2.9M22.2 30.7l-1.4-2.8 20.6-10.3 1.5 2.8-20.7 10.3"></path>
            </g>
          </svg>
        </div>
        <span className="text-white space-y-1">
          Can be clicked to see the tree visualization of Merge Sort where
          hovering on a particular node/subarray displays its sorted version
          after the merging process is complete
        </span>
      </div>
    </div>
  );
}
