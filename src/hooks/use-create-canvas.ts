import { CreateCanvasProps } from "../types/q5-canvas";
import { useCanvasState } from "./use-canvas-state";
import { useMemo } from "react";

function isInitialStateFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === "function" && value.length === 0;
}

export const useCreateCanvas = <T>(
  initialState: T | (() => T),
  draw: CreateCanvasProps<T>["draw"],
  events?: CreateCanvasProps<T>["events"]
) => {
  const id = useMemo(() => crypto.randomUUID(), []);

  const processedInitialState = useMemo(
    () =>
      isInitialStateFunction(initialState) ? initialState() : initialState,
    []
  );

  const state = useCanvasState<T>(id, processedInitialState);

  return useMemo(
    () => ({
      draw,
      state,
      events,
    }),
    [draw, state, events]
  );
};
