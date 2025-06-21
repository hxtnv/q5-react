import { useEffect, useRef } from "react";
import q5 from "q5";
import type { Q5CanvasProps } from "../types/q5-canvas";

interface UseCanvasProps {
  draw: Q5CanvasProps["draw"];
  state?: Q5CanvasProps["state"];
  sizeInternal: Q5CanvasProps["size"];
}

const DEFAULT_CANVAS_SIZE = 500;

export const useCanvas = ({ draw, state, sizeInternal }: UseCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchInstanceRef = useRef<typeof q5 | null>(null);
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    if (sketchInstanceRef.current) {
      sketchInstanceRef.current.remove();
      sketchInstanceRef.current = null;
    }

    if (!containerRef.current) return;

    const timeoutId = setTimeout(() => {
      if (sketchInstanceRef.current || !containerRef.current) return;

      const sketch = (p: q5) => {
        const pressedKeys = new Set<string>();
        const pressedMouseButtons = new Set<number>();

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
          drawRef.current?.(p, state, {
            pressedKeys,
            pressedMouseButtons,
          });
        };

        p.windowResized = () => {
          if (sizeInternal === "fullscreen") {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          }
        };

        p.keyPressed = () => {
          pressedKeys.add(p.key);
        };

        p.keyReleased = () => {
          pressedKeys.delete(p.key);
        };

        p.mousePressed = () => {
          pressedMouseButtons.add(p.mouseButton);
        };

        p.mouseReleased = () => {
          pressedMouseButtons.delete(p.mouseButton);
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

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => e.preventDefault();

    containerRef.current?.addEventListener("contextmenu", handleContextmenu);

    const canvasElement = containerRef.current?.querySelector("canvas");
    if (canvasElement) {
      canvasElement.addEventListener("contextmenu", handleContextmenu);
    }

    return () => {
      containerRef.current?.removeEventListener(
        "contextmenu",
        handleContextmenu
      );

      containerRef.current
        ?.querySelector("canvas")
        ?.removeEventListener("contextmenu", handleContextmenu);
    };
  }, [containerRef]);

  return { sketchInstanceRef, containerRef };
};
