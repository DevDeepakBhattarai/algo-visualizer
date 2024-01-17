import React from "react";
import Sort from "@/components/Sort";
import ExtraArray from "@/components/ExtraArray";

async function SortingApp() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-end px-4 pt-2">
      <ExtraArray />
      <Sort />
    </div>
  );
}

export default SortingApp;
