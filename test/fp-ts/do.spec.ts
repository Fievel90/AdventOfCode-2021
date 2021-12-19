import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";

describe("Testing FP-TS - Do", () => {
  it("Bind", async () => {
    const multiply = (init: number): T.Task<number> => () => Promise.resolve(init * 2);
    const multiplyE = (init: number): TE.TaskEither<never, number> => () => Promise.resolve(E.right(init * 2));
    const main = pipe(
      T.bindTo('init')(() => Promise.resolve(2)),
      T.bind('first', ({ init }) => multiply(init)),
      T.chainFirst(a => () => Promise.resolve(a.first)),
      T.chain(a => () => Promise.resolve(E.right(a))),
      TE.bind('second', ({ first }) => multiplyE(first)),
      TE.bind('third', ({ second }) => multiplyE(second)),
      TE.map(({ third }) => third)
    );
    const result = await main();

    expect(result).toEqual(E.right(16));
  });
});
