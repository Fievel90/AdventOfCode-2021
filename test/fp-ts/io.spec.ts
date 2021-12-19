import { pipe } from "fp-ts/function";
import * as IO from "fp-ts/IO";

describe("Testing FP-TS", () => {
  it("IO", () => {
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
});
