import React from "react";

import Sort from "@/components/Sort";
import { useStore } from "@/lib/zustand-store";
import { generateRandomArray } from "@/lib/utils";
async function SortingApp() {
  useStore.setState({
    length: 100,
    array: generateRandomArray(100, 5, 40),
  });

  return (
    <div className="w-full grid items-end px-4">
      <Sort />
    </div>
  );
}

export default SortingApp;
