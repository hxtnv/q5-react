/// <reference path="./types/q5.d.ts" />
import { useEffect, useMemo, useRef } from "react";
import q5 from "q5";
import "./q5-canvas.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SharedState = Record<string, any>;

export interface Q5CanvasProps {
  size?: "fullscreen" | number | [number, number];
  draw: (p: q5, sharedState: SharedState) => void;
  sharedState?: SharedState;
  children?: React.ReactNode;
}

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

  const sizeNormalized = useMemo(() => {
    if (size === "fullscreen") {
      return [window.innerWidth, window.innerHeight];
    } else if (typeof size === "number") {
      return [size, size];
    } else {
      return size;
    }
  }, [size]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.q5-canvas-fullscreen{width:100vw;height:100vh;position:fixed;inset:0;z-index:9999;overflow:hidden}.q5-canvas{position:relative}.q5-canvas canvas,.q5-canvas-fullscreen canvas{position:absolute;inset:0}.q5-canvas .q5-canvas-overlay,.q5-canvas-fullscreen .q5-canvas-overlay{position:absolute;inset:0;z-index:10000;user-select:none;pointer-events:none}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

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
          p.createCanvas(sizeNormalized[0], sizeNormalized[1]);
        };

        p.draw = () => {
          drawRef.current?.(p, stateRef.current ?? {});
        };

        p.windowResized = () => {
          if (size === "fullscreen") {
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
  }, [size, sizeNormalized]);

  return (
    <div
      ref={containerRef}
      className={size === "fullscreen" ? "q5-canvas-fullscreen" : "q5-canvas"}
      style={{ width: sizeNormalized[0], height: sizeNormalized[1] }}
    >
      {children && <div className="q5-canvas-overlay">{children}</div>}
    </div>
  );
};

export default Q5Canvas;
