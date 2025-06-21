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
- ✅ Type-safe state management with `useCanvasState`
- ✅ Strongly typed drawing functions with `createDraw`

## 🧠 Why?

[q5](https://github.com/q5js/q5.js) is an awesome library for building web games and experiences, but oftentimes you want something more complex than a website with just a canvas on it - perhaps some menus or actions before you get to the actual canvas. While q5 is compatible with React thanks to [instance mode](https://github.com/q5js/q5.js/wiki/Instance-Mode), setting it up in modern React requires a few "gotchas" that might be tricky for a newcomer. For example, simply initiating a new q5 instance on initial render will result in two canvases being drawn at the same time, with only one of them being active (this is because of React's Strict Mode which is usually enabled by default - disabling it is a solution but not a valid one). This library aims to smoothen this experience by taking care of all the annoyances and letting you focus on just the fun parts.

## 📦 Install

```bash
npm install q5-react q5
```

> `q5` is a peer dependency — make sure it's installed too

## 🖥️ How to use

```tsx
import Q5Canvas, { createDraw } from "q5-react";

const draw = createDraw((p) => {
  p.background(0);

  p.fill(255);
  p.ellipse(p.mouseX, p.mouseY, 20, 20);
});

// in your component
<Q5Canvas draw={draw} size={500} />;
```

## 💻 Full example

```tsx
import Q5Canvas, { useCanvasState, createDraw } from "q5-react";

// define your state type
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

    // handle keyboard input
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

    // handle mouse input
    if (pressedMouseButtons.has(p.LEFT)) {
      state.position.x -= 3;
    } else if (pressedMouseButtons.has(p.RIGHT)) {
      state.position.x += 3;
    }
  }
);

function App() {
  const canvasState = useCanvasState<MyCountStateType>("my-count-state", {
    count: 0,
    position: { x: 100, y: 100 },
  });

  return (
    <div>
      <button
        onClick={() => canvasState.set({ count: canvasState.get().count + 1 })}
      >
        Increase count
      </button>

      <Q5Canvas state={canvasState} draw={draw} size={500}>
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
| `draw`     | `DrawFn<T>` from `createDraw<T>`                                   | Your type-safe drawing function                                               | `undefined` |
| `state`    | `CanvasState<T>` from `useCanvasState<T>`                          | Optional canvas state to use with the draw function                           | `undefined` |
| `size`     | `"fullscreen"` or `number` or `[number, number]`                   | Canvas size. "fullscreen" will take up the entire page                        | `500`       |
| `children` | `React.ReactNode` or `(({ toggleFullscreen }) => React.ReactNode)` | HTML element to overlay on top of the canvas. Useful for buttons, menus, etc. | `undefined` |

## 🤜 Tips

- Use `useCanvasState<T>` to create type-safe, persistent state that survives hot reloads
- Access state with `canvasState.get()` and update it with `canvasState.set()`
- Subscribe to state changes with `canvasState.subscribe(callback)`
- Use `createDraw<T>` to create type-safe drawing functions with proper typing
- The draw function provides access to `pressedKeys` and `pressedMouseButtons` for input handling
- Resize support is automatic when using `size="fullscreen"`

## 👨‍💻 API Reference

### `useCanvasState<T>`

```tsx
const canvasState = useCanvasState<StateType>(id: string, initial: T): CanvasState<T>
```

Creates a persistent state container that survives hot reloads. Returns an object with the following methods:

- `get(): T` - Returns the current state
- `set(partial: Partial<T>): void` - Updates the state (merges with current state)
- `subscribe(callback: (state: T) => void): () => boolean` - Subscribe to state changes, returns an unsubscribe function

### `createDraw<T>`

```tsx
const draw = createDraw<T>((p: q5, state: T, extras: DrawExtras) => void): DrawFn<T>
```

Creates a type-safe drawing function for use with Q5Canvas. The function receives:

- `p: q5` - The q5 instance for drawing
- `state: T` - Your typed state
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
