import { useEffect, useState } from "react";
import screenfull from "screenfull";
import type { Q5CanvasProps } from "../types/q5-canvas";

export const useCanvasSize = ({ size }: { size: Q5CanvasProps["size"] }) => {
  const [sizeInternal, setSizeInternal] = useState<Q5CanvasProps["size"]>(size);

  const toggleFullscreen = () => {
    screenfull.toggle();
    setSizeInternal((prev) => (prev === "fullscreen" ? size : "fullscreen"));
  };

  useEffect(() => {
    setSizeInternal(size);
  }, [size]);

  return { sizeInternal, toggleFullscreen };
};
