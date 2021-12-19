import { pipe } from "fp-ts/function";
import * as IO from "fp-ts/IO";

describe("Testing FP-TS - IO", () => {
  it("Chain", () => {
    const multiply = (init: number): IO.IO<number> => () => init * 2;
    const main = pipe(
      2,
      multiply,
      IO.chain(multiply),
      IO.chain(multiply),
    );
    const result = main();

    expect(result).toEqual(16);
  });

  it("Map", () => {
    const multiply = (init: number): number => init * 2;
    const main = pipe(
      2,
      IO.of,
      IO.map(multiply),
      IO.map(multiply),
      IO.map(multiply),
    );
    const result = main();

    expect(result).toEqual(16);
  });
});
