import { pipe } from "fp-ts/function";
import * as SRTE from "fp-ts/StateReaderTaskEither";
import * as E from "fp-ts/Either";

interface Deps {
  multiplier: number
}

interface Config {
  logs: string[]
}

describe("Testing FP-TS", () => {
  it("StateReaderTaskEither", async () => {
    const multiply = (init: number): SRTE.StateReaderTaskEither<Config, Deps, never, number> =>
      (config) => (deps) => () => Promise.resolve(E.right(
        [
          init * deps.multiplier,
          {
            ...config,
            logs: [
              ...config.logs,
              `Multiplying ${init} * 2`
            ]
          }
        ]
      ));

    const main = pipe(
      2,
      multiply,
      SRTE.chain(multiply),
      SRTE.chain(multiply),
    );
    const result = await main({ logs: [] })({ multiplier: 2 })();

    expect(result).toEqual(E.right(
      [
        16,
        {
          logs: [
            'Multiplying 2 * 2',
            'Multiplying 4 * 2',
            'Multiplying 8 * 2',
          ],
        }
      ]
    ));
  });
});
