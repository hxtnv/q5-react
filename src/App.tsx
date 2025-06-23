import Q5Canvas from "./q5-canvas";
import { useState } from "react";
import { useCreateCanvas } from "./lib/canvas";

type MyCountStateType = {
  count: number;
  position: { x: number; y: number };
};

function App() {
  const [test, setTest] = useState(0);

  const myCanvas = useCreateCanvas<MyCountStateType>(
    {
      count: 0,
      position: { x: 100, y: 100 },
    },
    (p: any, state: any, { pressedKeys, pressedMouseButtons }: any) => {
      p.background(0);
      p.fill(255);

      const count = state?.get().count ?? 0;
      const position = state?.get().position ?? { x: 100, y: 100 };

      for (let i = 0; i < count; i++) {
        p.ellipse(i * 10 + 5, 50, 10, 10);
      }

      const text = `Count is: ${count}`;

      p.textSize(24);
      p.text(text, p.width / 2 - p.textWidth(text) / 2, p.height / 2);

      p.ellipse(position.x, position.y, 20, 20);

      if (pressedKeys.has("ArrowLeft")) {
        position.x -= 3;
      }
      if (pressedKeys.has("ArrowUp")) {
        position.y -= 3;
      }
      if (pressedKeys.has("ArrowRight")) {
        position.x += 3;
      }
      if (pressedKeys.has("ArrowDown")) {
        position.y += 3;
      }

      if (pressedMouseButtons.has(p.LEFT)) {
        position.x -= 3;
      } else if (pressedMouseButtons.has(p.RIGHT)) {
        position.x += 3;
      }
    }
  );

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
        onClick={() =>
          myCanvas.state.set({ count: myCanvas.state.get().count + 1 })
        }
      >
        Increase count
      </button>

      <button onClick={() => setTest(test + 1)}>Increase test {test}</button>

      <Q5Canvas canvas={myCanvas} size={500}>
        {({ toggleFullscreen }) => (
          <button onClick={toggleFullscreen}>Fullscreen</button>
        )}
      </Q5Canvas>
    </div>
  );
}

export default App;
