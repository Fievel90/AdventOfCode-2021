import { pipe } from "fp-ts/function";
import * as R from "fp-ts/Reader";

interface Deps {
  multiplier: number
}

describe("Testing FP-TS - Reader", () => {
  it("Chain", () => {
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

  it("Map", () => {
    const multiply = (init: number): R.Reader<Deps, number> => pipe(
      R.ask<Deps>(),
      R.map(({ multiplier }) => init * multiplier)
    );

    const main = pipe(
      2,
      a => R.of<Deps, number>(a),
      R.chain(multiply),
      R.chain(multiply),
      R.chain(multiply),
    );
    const result = main({ multiplier: 2 });

    expect(result).toEqual(16);
  });
});
