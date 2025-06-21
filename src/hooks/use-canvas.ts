import { useEffect, useRef } from "react";
import q5 from "q5";
import type { SharedState, Q5CanvasProps } from "../types/q5-canvas";

interface UseCanvasProps {
  draw: Q5CanvasProps["draw"];
  sharedState?: SharedState;
  sizeInternal: Q5CanvasProps["size"];
}

const DEFAULT_CANVAS_SIZE = 500;

export const useCanvas = ({
  draw,
  sharedState,
  sizeInternal,
}: UseCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchInstanceRef = useRef<typeof q5 | null>(null);
  const stateRef = useRef<SharedState | null>(sharedState);
  const drawRef = useRef(draw);

  // Update refs when props change
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    stateRef.current = sharedState;
  }, [sharedState]);

  useEffect(() => {
    if (sketchInstanceRef.current) {
      sketchInstanceRef.current.remove();
      sketchInstanceRef.current = null;
    }

    if (!containerRef.current) return;

    const timeoutId = setTimeout(() => {
      if (sketchInstanceRef.current || !containerRef.current) return;

      const sketch = (p: q5) => {
        p.setup = () => {
          const sizeCanvas =
            sizeInternal === "fullscreen"
              ? [p.windowWidth, p.windowHeight]
              : typeof sizeInternal === "number"
              ? [sizeInternal, sizeInternal]
              : sizeInternal;

          p.createCanvas(
            sizeCanvas?.[0] ?? DEFAULT_CANVAS_SIZE,
            sizeCanvas?.[1] ?? DEFAULT_CANVAS_SIZE
          );
        };

        p.draw = () => {
          drawRef.current?.(p, stateRef.current ?? {});
        };

        p.windowResized = () => {
          if (sizeInternal === "fullscreen") {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          }
        };
      };

      sketchInstanceRef.current = new q5(sketch, containerRef.current);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (sketchInstanceRef.current) {
        sketchInstanceRef.current.remove();
        sketchInstanceRef.current = null;
      }
    };
  }, [containerRef, sizeInternal]);

  return { sketchInstanceRef, containerRef };
};
