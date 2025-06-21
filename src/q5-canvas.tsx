import { useEffect, useRef } from "react";
import q5 from "q5";
import "./q5-canvas.css";
import { useCanvasSize } from "./hooks/use-canvas-size";
import type { Q5CanvasProps, SharedState } from "./types/q5-canvas";

const Q5Canvas: React.FC<Q5CanvasProps> = ({
  size = 500,
  draw,
  sharedState,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchInstanceRef = useRef<q5 | null>(null);
  const stateRef = useRef<SharedState | null>(sharedState);
  const drawRef = useRef(draw);

  const { sizeInternal, toggleFullscreen } = useCanvasSize({ size });

  // useEffect(() => {
  //   const style = document.createElement("style");
  //   style.textContent = `.q5-canvas-fullscreen{width:100vw;height:100vh;position:fixed;inset:0;z-index:9999;overflow:hidden}.q5-canvas{position:relative}.q5-canvas canvas,.q5-canvas-fullscreen canvas{position:absolute;inset:0}.q5-canvas .q5-canvas-overlay,.q5-canvas-fullscreen .q5-canvas-overlay{position:absolute;inset:0;z-index:10000;user-select:none;pointer-events:none}`;
  //   document.head.appendChild(style);
  //   return () => style.remove();
  // }, []);

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

          p.createCanvas(sizeCanvas?.[0] ?? 500, sizeCanvas?.[1] ?? 500);
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
  }, [sizeInternal]);

  return (
    <div
      ref={containerRef}
      className={
        sizeInternal === "fullscreen" ? "q5-canvas-fullscreen" : "q5-canvas"
      }
    >
      {children && (
        <div className="q5-canvas-overlay">
          {typeof children === "function"
            ? children({ toggleFullscreen, isFullscreen: false })
            : children}
        </div>
      )}
    </div>
  );
};

export default Q5Canvas;
