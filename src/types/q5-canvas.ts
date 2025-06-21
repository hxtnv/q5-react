import q5 from "q5";
import { createCanvasState } from "../lib/canvas-state";

export interface SharedState {
  [key: string | number]: any;
}

export interface DrawExtras {
  pressedKeys: Set<string>;
  pressedMouseButtons: Set<number>;
}

export type DrawFn = (
  p: q5,
  sharedState: SharedState,
  extras: DrawExtras
) => void;

export interface Q5CanvasProps {
  size?: "fullscreen" | number | [number, number];
  // draw: (
  //   p: q5,
  //   sharedState: SharedState,
  //   {
  //     pressedKeys,
  //     pressedMouseButtons,
  //   }: {
  //     pressedKeys: Set<string>;
  //     pressedMouseButtons: Set<number>;
  //   }
  // ) => void;
  draw: DrawFn;
  state?: ReturnType<typeof createCanvasState>;
  children?:
    | React.ReactNode
    | (({
        toggleFullscreen,
      }: {
        toggleFullscreen: () => void;
      }) => React.ReactNode);
}
