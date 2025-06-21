import { useMemo } from "react";
import { createCanvasState } from "../lib/canvas-state";

const globalStates = new Map<string, any>();

export const useCanvasState = <T>(id: string, initial: T) => {
  if (import.meta.hot) {
    if (!globalStates.has(id)) {
      globalStates.set(id, createCanvasState<T>(initial));
    }
    return globalStates.get(id);
  }

  return useMemo(() => createCanvasState<T>(initial), []);
};
