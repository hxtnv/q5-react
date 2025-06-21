import { useEffect, useState } from "react";
import { useCanvasSize } from "./hooks/use-canvas-size";
import { useCanvas } from "./hooks/use-canvas";
import type { Q5CanvasProps } from "./types/q5-canvas";
import "./q5-canvas.css";

const Q5Canvas: React.FC<Q5CanvasProps> = ({
  size = 500,
  draw,
  state,
  children,
}) => {
  const { sizeInternal, toggleFullscreen } = useCanvasSize({ size });
  const { containerRef } = useCanvas({
    draw,
    state,
    sizeInternal,
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.q5-canvas-fullscreen{width:100vw;height:100vh;position:fixed;inset:0;z-index:100;overflow:hidden}.q5-canvas{position:relative}.q5-canvas canvas,.q5-canvas-fullscreen canvas{display:block}.q5-canvas .q5-canvas-overlay,.q5-canvas-fullscreen .q5-canvas-overlay{position:absolute;inset:0;z-index:101;pointer-events:none}.q5-canvas .q5-canvas-overlay *,.q5-canvas-fullscreen .q5-canvas-overlay *{pointer-events:initial}`;
    document.head.appendChild(style);

    return () => style.remove();
  }, []);

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
            ? children({ toggleFullscreen })
            : children}
        </div>
      )}
    </div>
  );
};

export default Q5Canvas;
