import React from "react";

import Sort from "@/components/Sort";
import { useStore } from "@/lib/zustand-store";
import { generateRandomArray } from "@/lib/utils";
async function SortingApp() {
  useStore.setState({
    length: 50,
    array: generateRandomArray(50, 5, 40, "white"),
  });

  return (
    <div className="w-full grid items-end px-4">
      <Sort />
    </div>
  );
}

export default SortingApp;
