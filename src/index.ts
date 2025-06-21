// import { DrawFn } from "./types/q5-canvas";
// export type { SharedState, Q5CanvasProps } from "./types/q5-canvas";
// export { default as Q5Canvas } from "./q5-canvas";
// export { useCanvasState } from "./hooks/use-canvas-state";
// export const createDraw = (fn: DrawFn) => fn;
import { DrawFn } from "./types/q5-canvas";
import Q5Canvas from "./q5-canvas";
export default Q5Canvas;

export * from "./hooks/use-canvas-state";
export * from "./types/q5-canvas";
export const createDraw = (fn: DrawFn) => fn;
