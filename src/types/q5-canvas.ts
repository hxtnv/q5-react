import q5 from "q5";

export interface SharedState {
  [key: string | number]: any;
}

export interface Q5CanvasProps {
  size?: "fullscreen" | number | [number, number];
  draw: (p: q5, sharedState: SharedState) => void;
  sharedState?: SharedState;
  children?:
    | React.ReactNode
    | (({
        toggleFullscreen,
        isFullscreen,
      }: {
        toggleFullscreen: () => void;
        isFullscreen: boolean;
      }) => React.ReactNode);
}
