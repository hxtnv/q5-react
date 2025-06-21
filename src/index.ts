import { DrawFn } from "./types/q5-canvas";
import Q5Canvas from "./q5-canvas";
export default Q5Canvas;

export * from "./hooks/use-canvas-state";
export * from "./types/q5-canvas";
export const createDraw = (fn: DrawFn) => fn;
