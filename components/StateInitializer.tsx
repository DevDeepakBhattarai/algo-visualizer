"use client";
import { useStore } from "@/lib/zustand-store";
import React, { ReactElement } from "react";

interface Props {
  array: Bar[];
}

export default function StateInitializer({ array }: Props) {
  useStore.setState({ array });
  return null;
}
