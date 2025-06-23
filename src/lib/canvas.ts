import { DrawFn, Q5CanvasProps } from "../types/q5-canvas";
import { useCanvasState } from "../hooks/use-canvas-state";

function isInitialStateFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === "function" && value.length === 0;
}

export const useCreateCanvas = <T>(
  initialState: T | (() => T),
  draw: DrawFn<T>
) => {
  const id = crypto.randomUUID();
  const state = useCanvasState<T>(
    id,
    isInitialStateFunction(initialState) ? initialState() : initialState
  );

  return {
    draw,
    state,
  };
};
