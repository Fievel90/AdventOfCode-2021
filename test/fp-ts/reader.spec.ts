import { pipe } from "fp-ts/function";
import * as R from "fp-ts/Reader";

interface Deps {
  multiplier: number
}

describe("Testing FP-TS", () => {
  it("Reader", () => {
    const multiply = (init: number): R.Reader<Deps, number> => ({ multiplier }) => init * multiplier;
    const main = pipe(
      2,
      multiply,
      R.chain(multiply),
      R.chain(multiply),
    );
    const result = main({ multiplier: 2 });

    expect(result).toEqual(16);
  });
});
