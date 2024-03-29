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
  const iterationSound = useRef<HTMLAudioElement>(null);
  const foundSound = useRef<HTMLAudioElement>(null);
  const swapSound = useRef<HTMLAudioElement>(null);

  const [data, setData] = useState<RawNodeDatum[]>([
    {
      name: "root",
      attributes: {
        array: JSON.stringify(array.map((bar) => bar.value)),
        id: crypto.randomUUID(),
      },
      children: [],
    },
  ]);

  useEffect(() => {
    setData([
      {
        name: "root",
        attributes: {
          array: JSON.stringify(array.map((bar) => bar.value)),
          id: crypto.randomUUID(),
        },
        children: [],
      },
    ]);
  }, [array.length]);

  useEffect(() => {
    if (isSorting && sortingAlgorithm === "quick")
      QuickSort(
        array,
        setArray,
        speed,
        startTransition,
        setIsSorting,
        setData,
        data,
        color,
        iterationSound.current,
        foundSound.current,
        swapSound.current
      );
  }, [isSorting]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-end px-4 pt-2">
      <audio
        src={soundIterate + ".mp3"}
        className="invisible"
        ref={iterationSound}
      ></audio>
      <audio
        src={soundElementFound + ".mp3"}
        className="invisible"
        ref={foundSound}
      ></audio>
      <audio
        src={soundSwap + ".mp3"}
        className="invisible"
        ref={swapSound}
      ></audio>
      <QuickSortTree data={data} />
      <Sort></Sort>
    </div>
  );
}

function QuickSortTree({ data }: { data: RawNodeDatum[] }) {
  const [translate, containerRef] = useCenteredTree();
  const { array } = useStore();
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
          transitionDuration={200}
          nodeSize={{ y: 200, x: ((array.length + 10) / 100) * 1700 }}
          zoom={0.5}
          separation={{ siblings: 1, nonSiblings: 1 }}
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
      <foreignObject
        {...foreignObjectProps}
        className="overflow-visible flex flex-wrap"
      >
        <div
          className="bg-white h-max w-max rounded-sm border border-black   -translate-x-1/2"
          onClick={toggleNode}
        >
          {/* <h3 className="text-center text-black m-4">{nodeDatum.name}</h3> */}
          <div className="text-center flex flex-wrap border border-black text-black m-4">
            {(JSON.parse(nodeDatum.attributes.array) as number[]).map(
              (number, index) => {
                return (
                  <span
                    key={index}
                    className="flex-1 border-black border rounded-sm p-2.5"
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
