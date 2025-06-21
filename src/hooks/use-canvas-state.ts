import { useMemo } from "react";
import { createCanvasState } from "../lib/canvas-state";

type CanvasState<T> = {
  get: () => T;
  set: (partial: Partial<T>) => void;
  subscribe: (cb: (state: T) => void) => () => boolean;
};

const globalStates = new Map<string, CanvasState<any>>();

export const useCanvasState = <T>(id: string, initial: T): CanvasState<T> => {
  if (import.meta.hot) {
    if (!globalStates.has(id)) {
      globalStates.set(id, createCanvasState<T>(initial));
    }
    return globalStates.get(id) as CanvasState<T>;
  }

  return useMemo(() => createCanvasState<T>(initial), []);
};
