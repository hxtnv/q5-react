import { useMemo } from "react";
import { createCanvasState } from "../lib/canvas-state";

const globalStates = new Map<string, any>();

export const useCanvasState = <T extends object>(
  id: string,
  initial: T extends object ? T : never
) => {
  if (import.meta.hot) {
    if (!globalStates.has(id)) {
      globalStates.set(id, createCanvasState(initial));
    }
    return globalStates.get(id);
  }

  return useMemo(() => createCanvasState(initial), []);
};
