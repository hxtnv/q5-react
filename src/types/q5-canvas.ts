import q5 from "q5";
import { createCanvasState } from "../lib/canvas-state";

export interface DrawExtras {
  pressedKeys: Set<string>;
  pressedMouseButtons: Set<number>;
}

export interface CreateCanvasProps<T> {
  draw: DrawFn<T>;
  state: ReturnType<typeof createCanvasState<T>>;
}

export type DrawFn<T> = (
  p: q5,
  state: ReturnType<typeof createCanvasState<T>>,
  extras: DrawExtras
) => void;

export interface UseCanvasProps<T = any> {
  canvas: CreateCanvasProps<T>;
  sizeInternal: Q5CanvasProps["size"];
}

export interface Q5CanvasProps<T = any> {
  canvas: CreateCanvasProps<T>;
  size?: "fullscreen" | number | [number, number];
  children?:
    | React.ReactNode
    | (({
        toggleFullscreen,
      }: {
        toggleFullscreen: () => void;
      }) => React.ReactNode);
}
