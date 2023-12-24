"use client";
import { useState, useCallback, useEffect } from "react";
export default function Home() {
  const [state, setState] = useState(true);

  const print = useCallback(async () => {
    new Promise<void>((resolve, reject) => {
      while (state) {
        console.log("Hello there mate");
      }
      if (!state) {
        resolve();
      }
    });
  }, [state]);

  return (
    <div className="grid place-items-center">
      Hello there mate what up?
      <div className="space-x-4">
        <button
          className="px-2 py-1 bg-blue-500"
          onClick={() => {
            print();
          }}
        >
          Start Print
        </button>
        <button
          className="px-2 py-1 bg-blue-500"
          onClick={() => {
            console.log("Stop Clicked");
            setState(false);
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
