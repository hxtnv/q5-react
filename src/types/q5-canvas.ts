import q5 from "q5";
import { createCanvasState } from "../lib/canvas-state";

export interface SharedState {
  [key: string | number]: any;
}

export interface Q5CanvasProps {
  size?: "fullscreen" | number | [number, number];
  draw: (p: q5, sharedState: SharedState) => void;
  state?: ReturnType<typeof createCanvasState>;
  children?:
    | React.ReactNode
    | (({
        toggleFullscreen,
      }: {
        toggleFullscreen: () => void;
      }) => React.ReactNode);
}
