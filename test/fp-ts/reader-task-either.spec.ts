import { pipe } from "fp-ts/function";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as E from "fp-ts/Either";

interface Deps {
  multiplier: number
}

describe("Testing FP-TS", () => {
  it("ReaderTaskEither", async () => {
    const multiply = (init: number): RTE.ReaderTaskEither<Deps, never, number> =>
      (deps) => () => Promise.resolve(E.right(init * deps.multiplier));
    const main = pipe(
      2,
      multiply,
      RTE.chain(multiply),
      RTE.chain(multiply),
    );
    const result = await main({ multiplier: 2 })();

    expect(result).toEqual(E.right(16));
  });
});
