import { useMemo } from "react";
import { createCanvasState } from "../lib/canvas-state";

export const useCanvasState = <T extends object>(
  initial: T extends object ? T : never
) => {
  return useMemo(() => createCanvasState(initial), []);
};
