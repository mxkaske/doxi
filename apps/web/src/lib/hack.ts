// https://www.youtube.com/watch?v=h_9Vx6kio2s
// https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
// HACK

export function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R>
): (arg: T) => R {
  return fn as (arg: T) => R;
}

// const Delay = asyncComponent(async ({ ms }: { ms: number }) => {
//   const one = await delay(String(ms), ms);
//   return <p>{one}</p>;
// });
