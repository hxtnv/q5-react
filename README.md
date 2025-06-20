# 🎨 q5-react

> Minimal React wrapper for [q5](https://github.com/q5js/q5.js) — like p5, but faster ⚡

Build smooth, high-perf 2D games and visuals in React using q5 (a blazing fast, TypeScript-friendly fork of p5.js).  
This package gives you a clean, stable `<Q5Canvas />` component with full control over drawing + real-time game state.

---

## 🚀 Features

✅ React + Vite-ready  
✅ Works with React 18 / StrictMode  
✅ No double-canvas bugs 🧼  
✅ Custom draw functions  
✅ Fullscreen or custom size  
✅ Share real-time game state without re-rendering

---

## 🧠 Why does this exist?

[q5](https://github.com/q5js/q5.js) is an awesome library for building web games and experiences, but oftentimes you want something more complex than a website with just a canvas on it - perhaps some menus or actions before you get to the actual canvas. While q5 is compatible with React thanks to [instance mode](https://github.com/q5js/q5.js/wiki/Instance-Mode), setting it up in modern React requires a few "gotchas" that might be tricky for a newcomer. For example, simply initiating a new q5 instance on initial render will result in two canvases being drawn at the same time, with only one of them being active (this is because of React's Strict Mode which is usually enabled by default - disabling it is a solution but not a valid one). This library aims to smoothen this experience by taking care of all the annoyances and letting you focus on just the fun parts.

---

## 📦 Install

```bash
npm install q5-react q5
```

> `q5` is a peer dependency — make sure it’s installed too

---

## 💻 Example usage

```tsx
import { useState } from "react";
import q5 from "q5";
import Q5Canvas, { type SharedState } from "q5-react";
import "q5-react/dist/q5-react.css";

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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increase count
        </button>

        <p>Current count is: {count}</p>
      </div>

      <Q5Canvas sharedState={{ count }} draw={draw} size={500}>
        <div>Overlay element from React</div>
      </Q5Canvas>
    </>
  );
}

export default App;
```

---

## 🎛 Props

| Prop          | Type                                             | Description                                 | Default      |
| ------------- | ------------------------------------------------ | ------------------------------------------- | ------------ |
| `draw`        | `(p: q5, state: any) => void`                    | Your custom drawing function                | **required** |
| `sharedState` | `any`                                            | Optional data you want passed into `draw()` | `undefined`  |
| `size`        | `"fullscreen"` or `number` or `[number, number]` | Canvas size                                 | `500`        |

---

## 🤘 Tips

- For real-time games, pass `sharedState` using `useRef()` instead of `useState()` to avoid React rerenders
- You can handle inputs (e.g. `p.keyPressed`, `p.mousePressed`) inside your draw function too
- Resize support is automatic when using `size="fullscreen"`

---

## ⚠️ Cannot use namespace 'q5' as a type.

If you are getting this error, create a `q5.d.ts` file inside your `src` folder with the following content:

```js
declare module "q5" {
  import p5 from "p5";
  export = p5;
}
```

This should take care of the issue.

## 🛠 Built With

- [React](https://react.dev/)
- [q5](https://github.com/q5js/q5.js)
- [Vite](https://vitejs.dev/)
- TypeScript

---

## 📜 License

MIT — do whatever you want, just don't sell it as your own 😎

---

## ✨ Author

Made with frustration and love by [@hxtnv](https://github.com/hxtnv)

Give it a ⭐ if it helped you.
