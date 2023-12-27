import React from "react";
import Sort from "@/components/Sort";
import ExtraArray from "@/components/ExtraArray";

async function SortingApp() {
  return (
    <div className="w-full h-full grid grid-rows-2 px-4 pt-2">
      <ExtraArray />
      <Sort />
    </div>
  );
}

export default SortingApp;
