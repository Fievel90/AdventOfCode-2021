import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";

describe("Testing FP-TS", () => {
  it("TaskEither", async () => {
    const multiply = (init: number): TE.TaskEither<never, number> => () => Promise.resolve(E.right(init * 2));
    const main = pipe(
      2,
      multiply,
      TE.chain(multiply),
      TE.chain(multiply),
    );
    const result = await main();

    expect(result).toEqual(E.right(16));
  });
});
