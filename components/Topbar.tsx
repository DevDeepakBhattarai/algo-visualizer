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

interface Props {}

export default function TopNavbar({}: Props): ReactElement {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
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
