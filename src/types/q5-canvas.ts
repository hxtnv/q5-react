import q5 from "q5";
import { createCanvasState } from "../lib/canvas-state";

export interface DrawExtras {
  pressedKeys: Set<string>;
  pressedMouseButtons: Set<number>;
}

export type DrawFn<T> = (p: q5, state: T, extras: DrawExtras) => void;

export interface Q5CanvasProps<T = any> {
  size?: "fullscreen" | number | [number, number];
  draw: DrawFn<T>;
  state?: ReturnType<typeof createCanvasState<T>>;
  children?:
    | React.ReactNode
    | (({
        toggleFullscreen,
      }: {
        toggleFullscreen: () => void;
      }) => React.ReactNode);
}
