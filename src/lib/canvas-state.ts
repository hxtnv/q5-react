type Subscriber<T> = (state: T) => void;

export function createCanvasState<T>(initial: T extends object ? T : never) {
  let state: T extends object ? T : never = structuredClone(initial);
  const subs = new Set<Subscriber<T extends object ? T : never>>();

  const get = () => state;

  const set = (partial: Partial<T>) => {
    Object.assign(state, partial);

    subs.forEach((cb) => cb(state));
  };

  const subscribe = (cb: Subscriber<T>) => {
    subs.add(cb);

    return () => subs.delete(cb);
  };

  return { get, set, subscribe };
}
