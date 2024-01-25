"use client";
import React from "react";
import Sort from "@/components/Sort";
import ExtraArray from "@/components/ExtraArray";
import { useStore } from "@/lib/zustand-store";
import QuickSorter from "@/components/QuickSorter";

function SortingApp() {
  const { sortingAlgorithm } = useStore();
  if (sortingAlgorithm == "quick") return <QuickSorter></QuickSorter>;
  return (
    <div className="w-full h-full flex flex-col items-start justify-end px-4 pt-2">
      <ExtraArray />
      <Sort />
    </div>
  );
}

export default SortingApp;
