import { useEffect } from "react";
import { useCanvasSize } from "./hooks/use-canvas-size";
import { useCanvas } from "./hooks/use-canvas";
import type { Q5CanvasProps } from "./types/q5-canvas";
import "./q5-canvas.css";

const Q5Canvas: React.FC<Q5CanvasProps> = ({
  size = 500,
  draw,
  sharedState,
  children,
}) => {
  const { sizeInternal, toggleFullscreen } = useCanvasSize({ size });

  const { containerRef } = useCanvas({
    draw,
    sharedState,
    sizeInternal,
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.q5-canvas-fullscreen{width:100vw;height:100vh;position:fixed;inset:0;z-index:9999;overflow:hidden}.q5-canvas{position:relative}.q5-canvas canvas,.q5-canvas-fullscreen canvas{display:block}.q5-canvas .q5-canvas-overlay,.q5-canvas-fullscreen .q5-canvas-overlay{position:absolute;inset:0;z-index:10000}`;
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
