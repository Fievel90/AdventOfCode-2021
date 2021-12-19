import { pipe } from "fp-ts/function";
import * as T from "fp-ts/Task";

describe("Testing FP-TS", () => {
  it("Task", async () => {
    const multiply = (init: number): T.Task<number> => () => Promise.resolve(init * 2);
    const main = pipe(
      2,
      multiply,
      T.chain(multiply),
      T.chain(multiply),
    );
    const result = await main();

    expect(result).toEqual(16);
  });
});
