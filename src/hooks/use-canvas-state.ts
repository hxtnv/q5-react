import { useMemo } from "react";
import { createCanvasState } from "../lib/canvas-state";

let _state: ReturnType<typeof createCanvasState> | null = null;

export const useCanvasState = <T extends object>(
  initial: T extends object ? T : never
) => {
  if (import.meta.hot) {
    if (!_state) _state = createCanvasState(initial);
    return _state;
  }

  return useMemo(() => createCanvasState(initial), []);
  //   return useMemo(() => createCanvasState(initial), []);
};
