import React, { ReactElement } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Sidebar, { UtilityButtons } from "./Sidebar";
import { Settings } from "lucide-react";
interface Props {}

export default function TopNavbar({}: Props): ReactElement {
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
            <SheetClose>
              <UtilityButtons></UtilityButtons>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
