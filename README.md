# 🎨 q5-react

> Minimal React wrapper for [q5.js](https://github.com/q5js/q5.js)

Build smooth, high-performance 2D games and visuals in React using q5.js (a blazing fast p5.js alternative).  
This package gives you a clean, stable `<Q5Canvas />` component with full control over drawing + real-time state.

## 🚀 Features

- ✅ React + Vite-ready
- ✅ Works with React 18 / StrictMode
- ✅ Fullscreen support
- ✅ Easy overlay support
- ✅ Share real-time game state without re-rendering
- ✅ Type-safe state management with `useCreateCanvas`
- ✅ Strongly typed drawing functions with React-like state updates

## 🧠 Why?

[q5](https://github.com/q5js/q5.js) is an awesome library for building web games and experiences, but oftentimes you want something more complex than a website with just a canvas on it - perhaps some menus or actions before you get to the actual canvas. While q5 is compatible with React thanks to [instance mode](https://github.com/q5js/q5.js/wiki/Instance-Mode), setting it up in modern React requires a few "gotchas" that might be tricky for a newcomer. For example, simply initiating a new q5 instance on initial render will result in two canvases being drawn at the same time, with only one of them being active (this is because of React's Strict Mode which is usually enabled by default - disabling it is a solution but not a valid one). This library aims to smoothen this experience by taking care of all the annoyances and letting you focus on just the fun parts.

## 📦 Install

```bash
npm install q5-react q5
```

> `q5` is a peer dependency — make sure it's installed too

## 🖥️ How to use

```tsx
import Q5Canvas, { useCreateCanvas } from "q5-react";

function MyComponent() {
  const myCanvas = useCreateCanvas(
    {}, // initial state (empty in this case)
    (p) => {
      p.background(0);
      p.fill(255);
      p.ellipse(p.mouseX, p.mouseY, 20, 20);
    }
  );

  return <Q5Canvas canvas={myCanvas} size={500} />;
}
```

## 💻 Full example

```tsx
import Q5Canvas, { useCreateCanvas } from "q5-react";

// define your state type
type MyCountStateType = {
  count: number;
  position: { x: number; y: number };
};

function App() {
  const myCanvas = useCreateCanvas<MyCountStateType>(
    // define initial state
    {
      count: 0,
      position: { x: 100, y: 100 },
    },
    // define your draw function
    (p, state, { pressedKeys, pressedMouseButtons }) => {
      p.background(0);
      p.fill(255);

      for (let i = 0; i < state.get().count; i++) {
        p.ellipse(i * 10 + 5, 50, 10, 10);
      }

      const text = `Count is: ${state.get().count}`;

      p.textSize(24);
      p.text(text, p.width / 2 - p.textWidth(text) / 2, p.height / 2);

      p.ellipse(state.get().position.x, state.get().position.y, 20, 20);

      // handle keyboard input
      if (pressedKeys.has("ArrowLeft")) {
        state.set((prev) => ({
          position: {
            x: prev.position.x - 3,
            y: prev.position.y,
          },
        }));
      }
      if (pressedKeys.has("ArrowUp")) {
        state.set((prev) => ({
          position: {
            x: prev.position.x,
            y: prev.position.y - 3,
          },
        }));
      }
      if (pressedKeys.has("ArrowRight")) {
        state.set((prev) => ({
          position: {
            x: prev.position.x + 3,
            y: prev.position.y,
          },
        }));
      }
      if (pressedKeys.has("ArrowDown")) {
        state.set((prev) => ({
          position: {
            x: prev.position.x,
            y: prev.position.y + 3,
          },
        }));
      }

      // handle mouse input
      if (pressedMouseButtons.has(p.LEFT)) {
        state.set((prev) => ({
          position: {
            x: prev.position.x - 3,
            y: prev.position.y,
          },
        }));
      } else if (pressedMouseButtons.has(p.RIGHT)) {
        state.set((prev) => ({
          position: {
            x: prev.position.x + 3,
            y: prev.position.y,
          },
        }));
      }
    }
  );

  return (
    <div>
      <button
        onClick={() =>
          myCanvas.state.set((prev) => ({ count: prev.count + 1 }))
        }
      >
        Increase count
      </button>

      <Q5Canvas canvas={myCanvas} size={500}>
        {({ toggleFullscreen }) => (
          <button onClick={toggleFullscreen}>Fullscreen</button>
        )}
      </Q5Canvas>
    </div>
  );
}

export default App;
```

## 🎛 Props

| Prop       | Type                                                               | Description                                                                   | Default     |
| ---------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ----------- |
| `canvas`   | `CreateCanvasProps<T>` from `useCreateCanvas<T>`                   | Canvas object with draw function and state                                    | Required    |
| `size`     | `"fullscreen"` or `number` or `[number, number]`                   | Canvas size. "fullscreen" will take up the entire page                        | `500`       |
| `children` | `React.ReactNode` or `(({ toggleFullscreen }) => React.ReactNode)` | HTML element to overlay on top of the canvas. Useful for buttons, menus, etc. | `undefined` |

## 🤜 Tips

- Use `useCreateCanvas<T>` to create a canvas with type-safe, persistent state that survives hot reloads
- Access state with `canvas.state.get()` and update it with `canvas.state.set()`
- Update state with React-like updater functions: `state.set(prev => ({ ...prev, count: prev.count + 1 }))`
- Subscribe to state changes with `canvas.state.subscribe(callback)`
- The draw function provides access to `pressedKeys` and `pressedMouseButtons` for input handling
- Resize support is automatic when using `size="fullscreen"`

## 👨‍💻 API Reference

### `useCreateCanvas<T>`

```tsx
const canvas = useCreateCanvas<StateType>(
  initialState: T | (() => T),
  draw: (p: q5, state: CanvasState<T>, extras: DrawExtras) => void
): CreateCanvasProps<T>
```

Creates a canvas object with a persistent state container and draw function. Returns an object with:

- `draw` - Your drawing function
- `state` - A state object with the following methods:
  - `get(): T` - Returns the current state
  - `set(partialOrUpdater: Partial<T> | ((prevState: T) => Partial<T>))` - Updates the state using either a partial object or an updater function
  - `subscribe(callback: (state: T) => void): () => boolean` - Subscribe to state changes, returns an unsubscribe function

### Draw Function

The draw function passed to `useCreateCanvas` receives:

- `p: q5` - The q5 instance for drawing
- `state: CanvasState<T>` - Your typed state with get/set/subscribe methods
- `extras: DrawExtras` - Extra utilities including:
  - `pressedKeys: Set<string>` - Set of currently pressed keys
  - `pressedMouseButtons: Set<number>` - Set of currently pressed mouse buttons

## ⚠️ Cannot use namespace 'q5' as a type.

If you are getting this error, create a `q5.d.ts` file inside your `src` folder with the following content:

```js
declare module "q5" {
  import q5 = require("q5");
  export = q5;
}
```

This should take care of the issue.

## ✨ Authors

[@hxtnv](https://github.com/hxtnv) - creator of q5-react

[@quinton-ashley](https://github.com/quinton-ashley) - original creator of q5.js
