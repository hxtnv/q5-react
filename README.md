# 🎨 q5-react

> Minimal React wrapper for [q5.js](https://github.com/q5js/q5.js) with

Build smooth, high-perf 2D games and visuals in React using q5.js (a blazing fast p5.js alternative).  
This package gives you a clean, stable `<Q5Canvas />` component with full control over drawing + real-time state.

## 🚀 Features

- ✅ React + Vite-ready
- ✅ Works with React 18 / StrictMode
- ✅ Fullscreen support
- ✅ Easy overlay support
- ✅ Share real-time game state without re-rendering

## 🧠 Why?

[q5](https://github.com/q5js/q5.js) is an awesome library for building web games and experiences, but oftentimes you want something more complex than a website with just a canvas on it - perhaps some menus or actions before you get to the actual canvas. While q5 is compatible with React thanks to [instance mode](https://github.com/q5js/q5.js/wiki/Instance-Mode), setting it up in modern React requires a few "gotchas" that might be tricky for a newcomer. For example, simply initiating a new q5 instance on initial render will result in two canvases being drawn at the same time, with only one of them being active (this is because of React's Strict Mode which is usually enabled by default - disabling it is a solution but not a valid one). This library aims to smoothen this experience by taking care of all the annoyances and letting you focus on just the fun parts.

## 📦 Install

```bash
npm install q5-react q5
```

> `q5` is a peer dependency — make sure it’s installed too

## 🖥️ How to use

```tsx
import q5 from "q5";
import Q5Canvas, { type SharedState } from "q5-react";

<Q5Canvas
  size={500}
  sharedState={{ count: 123 }}
  draw={(p: q5, state: SharedState) => {
    p.background(0);
    p.fill(255);
    p.text(`Current count is: ${state.count}`, 20, 20);
  }}
/>;
```

## 💻 Full example

```tsx
import { useState } from "react";
import q5 from "q5";
import Q5Canvas, { type SharedState } from "q5-react";

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
    <>
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
      </div>

      <Q5Canvas sharedState={{ count }} draw={draw} size={500}>
        {({ toggleFullscreen }) => (
          <button onClick={toggleFullscreen}>Toggle fullscreen</button>
        )}
      </Q5Canvas>
    </>
  );
}

export default App;
```

## 🎛 Props

| Prop          | Type                                                               | Description                                                                   | Default     |
| ------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ----------- |
| `draw`        | `(p: q5, state: any) => void`                                      | Your custom drawing function                                                  | `undefined` |
| `sharedState` | `Record<string, any>`                                              | Optional data you want passed into `draw()`                                   | `undefined` |
| `size`        | `"fullscreen"` or `number` or `[number, number]`                   | Canvas size. "fullscreen" will take up the entire page                        | `500`       |
| `children`    | `React.ReactNode` or `(({ toggleFullscreen }) => React.ReactNode)` | HTML element to overlay on top of the canvas. Useful for buttons, menus, etc. | `undefined` |

## 🤘 Tips

- For real-time games, pass `sharedState` using `useRef()` instead of `useState()` to avoid React rerenders
- You can handle inputs (e.g. `p.keyPressed`, `p.mousePressed`) inside your draw function too
- Resize support is automatic when using `size="fullscreen"`

## ⚠️ Cannot use namespace 'q5' as a type.

If you are getting this error, create a `q5.d.ts` file inside your `src` folder with the following content:

```js
declare module "q5" {
  import q5 = require("q5");
  export = q5;
}
```

This should take care of the issue.

## 📜 License

MIT — do whatever you want, just don't sell it as your own 😎

## ✨ Authors

[@hxtnv](https://github.com/hxtnv) - creator of q5-react
[@quinton-ashley](https://github.com/quinton-ashley) - original creator of q5.js
