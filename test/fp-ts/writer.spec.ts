import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as W from "fp-ts/Writer";

describe("Testing FP-TS", () => {
  it("Writer", () => {
    const writer = W.getChain<string[]>(A.getMonoid());
    const multiply = (init: number): W.Writer<string[], number> => () => [init * 2, [`Multiplying ${init} * 2`]];
    const main = pipe(
      2,
      multiply,
      (a) => writer.chain(a, multiply),
      (a) => writer.chain(a, multiply),
    );
    const result = main();

    expect(result).toEqual([
      16,
      [
        'Multiplying 2 * 2',
        'Multiplying 4 * 2',
        'Multiplying 8 * 2',
      ],
    ]);
  });
});
