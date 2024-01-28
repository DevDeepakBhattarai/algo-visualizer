"use client";
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Sort from "./Sort";
import Tree from "react-d3-tree";
import type { Point, RawNodeDatum } from "react-d3-tree";
import { useStore } from "@/lib/zustand-store";
import { useCenteredTree } from "@/hooks/useCenteredTree";
import { MergeSort } from "@/lib/SortingAlgoriths/merge-sort";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
interface Props {}

export default function MergeSorter({}: Props): ReactElement {
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
    setExtraArray,
    setIsSorting,
  } = useStore();
  const [_, startTransition] = useTransition();
  const iterationSound = useRef<HTMLAudioElement>(null);
  const foundSound = useRef<HTMLAudioElement>(null);
  const swapSound = useRef<HTMLAudioElement>(null);
  const [data, setData] = useState<RawNodeDatum[]>([
    {
      name: "root",
      attributes: {
        newArray: "[1,2,3,4,5]",
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
          newArray: "[1,2,3,4,5,6]",
          array: JSON.stringify(array.map((bar) => bar.value)),
          id: crypto.randomUUID(),
        },
        children: [],
      },
    ]);
  }, [array.length]);

  useEffect(() => {
    if (isSorting && sortingAlgorithm === "merge")
      MergeSort(
        array,
        setArray,
        speed,
        startTransition,
        setIsSorting,
        setData,
        data,
        extraArray,
        setExtraArray,
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
      <TheUpperArray treeData={data}></TheUpperArray>
      <Sort></Sort>
    </div>
  );
}

function TheUpperArray({ treeData }: { treeData: RawNodeDatum[] }) {
  const { extraArray } = useStore();
  return (
    <div className="relative flex w-full gap-1 items-end h-full flex-1 place-self-end border px-2 border-white overflow-clip rounded-md">
      <Drawer dismissible={false}>
        <DrawerTrigger className="absolute top-2 right-2">
          {" "}
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
        </DrawerTrigger>
        <DrawerContent className="h-3/5">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Tree visualization of Merge Sort
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 h-full">
            <MergeSortTree data={treeData}></MergeSortTree>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {extraArray.length > 0 &&
        extraArray.map((bar, index) => {
          return (
            <div
              key={bar.id}
              style={{
                backgroundColor: bar.color,
                height: `${bar.value}%`,
              }}
              className="flex-1 w-full rounded-sm "
            ></div>
          );
        })}
    </div>
  );
}
function MergeSortTree({ data }: { data: RawNodeDatum[] }) {
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
          shouldCollapseNeighborNodes
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
  console.log(nodeDatum);
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
          {nodeDatum.attributes.newArray &&
            JSON.parse(nodeDatum.attributes.newArray).length > 0 && (
              <HoverCard>
                <HoverCardTrigger>
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
                </HoverCardTrigger>
                <HoverCardContent className="w-max bg-white p-1">
                  <div className="text-center flex flex-wrap border bg-green-700/50 border-black text-black m-4">
                    {(
                      JSON.parse(nodeDatum.attributes.newArray) as number[]
                    ).map((number, index) => {
                      return (
                        <span
                          key={index}
                          className="flex-1 border-black border rounded-sm p-2.5"
                        >
                          {number}
                        </span>
                      );
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}

          {!(
            nodeDatum.attributes.newArray ||
            JSON.parse(nodeDatum.attributes.newArray ?? "[]").length > 0
          ) && (
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
          )}
        </div>
      </foreignObject>
    </>
  );
}
