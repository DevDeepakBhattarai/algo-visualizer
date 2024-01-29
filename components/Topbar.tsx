"use client";
import React, { ReactElement } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import { Settings } from "lucide-react";
import { Hints } from "./Hints";
import { useStore } from "@/lib/zustand-store";
import { useToast } from "./ui/use-toast";
interface Props {}

export default function TopNavbar({}: Props): ReactElement {
  const { sortingAlgorithm, isSorting, setIsSorting } = useStore();
  const { toast } = useToast();
  return (
    <div className="flex lg:hidden p-4 items-center justify-between">
      <div>
        <div>
          <h1 className="text-base mg:text-xl lg:text-2xl font-semibold w-fit">
            Sorting Algorithm Visualizer
          </h1>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Settings className="h-full w-full "></Settings>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Sidebar></Sidebar>

          <SheetFooter>
            <div className="flex items-center justify-between py-4">
              <Hints></Hints>
              <SheetClose asChild>
                <Button
                  type="submit"
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
                >
                  Start
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
