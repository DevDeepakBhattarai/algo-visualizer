"use client";
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import Sort from "./Sort";
import Tree from "react-d3-tree";
import type { Point, RawNodeDatum } from "react-d3-tree";
import { useStore } from "@/lib/zustand-store";
import { QuickSort } from "@/lib/SortingAlgoriths/quick-sort";
import { useCenteredTree } from "@/hooks/useCenteredTree";
interface Props {}

export default function QuickSorter({}: Props): ReactElement {
  const {
    sortingAlgorithm,
    setArray,
    soundElementFound,
    soundIterate,
    soundSwap,
    isSorting,
    color,
    array,
    speed,
    extraArray,
    setIsSorting,
    setExtraArray,
  } = useStore();
  const [isPending, startTransition] = useTransition();
  const iterationSound: HTMLAudioElement = useMemo(
    () => new Audio(soundIterate + ".mp3"),
    [soundIterate]
  );
  const foundSound: HTMLAudioElement = useMemo(
    () => new Audio(soundElementFound + ".mp3"),
    [soundElementFound]
  );

  const swapSound: HTMLAudioElement = useMemo(
    () => new Audio(soundSwap + ".mp3"),
    [soundSwap]
  );
  const [data, setData] = useState<RawNodeDatum[]>([
    {
      name: "root",
      attributes: { array: JSON.stringify(array.map((bar) => bar.value)) },
      children: [],
    },
  ]);
  useEffect(() => {
    if (isSorting && sortingAlgorithm === "quick")
      QuickSort(
        array,
        setArray,
        speed,
        startTransition,
        setIsSorting,
        setData,
        color,
        iterationSound,
        foundSound,
        swapSound
      );
  }, [isSorting]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-end px-4 pt-2">
      <QuickSortTree data={data} />
      <Sort></Sort>
    </div>
  );
}

function QuickSortTree({ data }: { data: RawNodeDatum[] }) {
  const [translate, containerRef] = useCenteredTree();
  return (
    <div
      ref={containerRef as unknown as any}
      className="flex w-full gap-1 items-end h-full flex-1 place-self-end  border px-2 border-white overflow-clip rounded-md text-white"
    >
      {data.length > 0 && (
        <Tree
          data={data}
          orientation="vertical"
          centeringTransitionDuration={100}
          translate={translate as Point}
          collapsible
          branchNodeClassName="[&_circle]:fill-white [&_text]:fill-white relative"
          rootNodeClassName="[&_circle]:fill-white [&_text]:fill-white relative"
          leafNodeClassName="[&_circle]:fill-white [&_text]:fill-white relative"
          pathClassFunc={() => "!stroke-white"}
          transitionDuration={100}
          enableLegacyTransitions
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps: { width: 200, height: 200, y: -4 },
            })
          }
        ></Tree>
      )}
    </div>
  );
}
function renderForeignObjectNode({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: {
  nodeDatum: any;
  toggleNode: any;
  foreignObjectProps: any;
}) {
  return (
    <>
      {/* <circle r="15" onClick={toggleNode}></circle> */}
      <foreignObject {...foreignObjectProps} className="overflow-visible">
        <div
          className=" bg-white h-max w-max rounded-sm border-black border -translate-x-1/2"
          onClick={toggleNode}
        >
          {/* <h3 className="text-center text-black m-4">{nodeDatum.name}</h3> */}
          <div className="text-center text-black m-4">
            {(JSON.parse(nodeDatum.attributes.array) as number[]).map(
              (number, index) => {
                return (
                  <span
                    key={index}
                    className="border-black border rounded-sm p-2.5"
                  >
                    {number}
                  </span>
                );
              }
            )}
          </div>
        </div>
      </foreignObject>
    </>
  );
}
