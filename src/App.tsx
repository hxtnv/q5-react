import Q5Canvas from "./q5-canvas";
import { useState } from "react";
import { useCanvasState } from "./hooks/use-canvas-state";
import { createDraw } from ".";

type MyCountStateType = {
  count: number;
  position: { x: number; y: number };
};

const draw = createDraw<MyCountStateType>(
  (p, state, { pressedKeys, pressedMouseButtons }) => {
    p.background(0);
    p.fill(255);

    for (let i = 0; i < state.count; i++) {
      p.ellipse(i * 10 + 5, 50, 10, 10);
    }

    const text = `Count is: ${state.count}`;

    p.textSize(24);
    p.text(text, p.width / 2 - p.textWidth(text) / 2, p.height / 2);

    p.ellipse(state.position.x, state.position.y, 20, 20);

    if (pressedKeys.has("ArrowLeft")) {
      state.position.x -= 3;
    }
    if (pressedKeys.has("ArrowUp")) {
      state.position.y -= 3;
    }
    if (pressedKeys.has("ArrowRight")) {
      state.position.x += 3;
    }
    if (pressedKeys.has("ArrowDown")) {
      state.position.y += 3;
    }

    if (pressedMouseButtons.has(p.LEFT)) {
      state.position.x -= 3;
    } else if (pressedMouseButtons.has(p.RIGHT)) {
      state.position.x += 3;
    }
  }
);

function App() {
  const [test, setTest] = useState(0);

  const canvasState = useCanvasState<MyCountStateType>("my-count-state", {
    count: 0,
    position: { x: 100, y: 100 },
  });

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
