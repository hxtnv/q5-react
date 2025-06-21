import q5 from "q5";
import Q5Canvas from "./q5-canvas";
import { SharedState } from "./types/q5-canvas";
import { useState } from "react";
import { useCanvasState } from "./hooks/use-canvas-state";

function App() {
  const [test, setTest] = useState(0);
  const canvasState = useCanvasState({ count: 0 });

  const draw = (p: q5, state: SharedState) => {
    p.background(0);
    p.fill(255);

    for (let i = 0; i < state.count; i++) {
      p.ellipse(i * 10 + 5, 50, 10, 10);
    }

    const text = `Count is: ${state.count}`;

    p.textSize(24);
    p.text(text, p.width / 2 - p.textWidth(text) / 2, p.height / 2);

    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "20px",
      }}
    >
      <button
        onClick={() => canvasState.set({ count: canvasState.get().count + 1 })}
      >
        Increase count
      </button>

      <button onClick={() => setTest(test + 1)}>Increase test {test}</button>

      <Q5Canvas state={canvasState} draw={draw} size={500}>
        {({ toggleFullscreen }) => (
          <button onClick={toggleFullscreen}>Fullscreen</button>
        )}
      </Q5Canvas>
    </div>
  );
}

export default App;
