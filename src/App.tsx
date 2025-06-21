import q5 from "q5";
import { useState } from "react";
import Q5Canvas from "./q5-canvas";
import { SharedState } from "./types/q5-canvas";

function App() {
  const [count, setCount] = useState(0);

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
      }}
    >
      <button onClick={() => setCount((count) => count + 1)}>
        Increase count
      </button>

      <p>Current count is: {count}</p>

      <Q5Canvas sharedState={{ count }} draw={draw} size={500}>
        {({ toggleFullscreen }) => (
          <button onClick={toggleFullscreen}>Fullscreen</button>
        )}
      </Q5Canvas>
    </div>
  );
}

export default App;
