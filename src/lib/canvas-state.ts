type Subscriber<T> = (state: T) => void;

export function createCanvasState<T>(initial: T) {
  let state: T = structuredClone(initial);
  const subs = new Set<Subscriber<T>>();

  const get = () => state;

  const set = (partial: Partial<T>) => {
    state = { ...state, ...partial };

    subs.forEach((cb) => cb(state));
  };

  const subscribe = (cb: Subscriber<T>) => {
    subs.add(cb);

    return () => subs.delete(cb);
  };

  return { get, set, subscribe };
}
