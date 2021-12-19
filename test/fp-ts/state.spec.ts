import { pipe } from "fp-ts/function";
import * as S from "fp-ts/State";

interface Config {
  multiplier: number
  logs: string[]
}

describe("Testing FP-TS", () => {
  it("State", () => {
    const multiply = (init: number): S.State<Config, number> =>
      (config) => [
        init * config.multiplier,
        {
          ...config,
          logs: [
            ...config.logs,
            `Multiplying ${init} * 2`
          ]
        }
      ];

    const main = pipe(
      2,
      multiply,
      S.chain(multiply),
      S.chain(multiply),
    );
    const result = main({ multiplier: 2, logs: [] });

    expect(result).toEqual([
      16,
      {
        multiplier: 2,
        logs: [
          'Multiplying 2 * 2',
          'Multiplying 4 * 2',
          'Multiplying 8 * 2',
        ],
      },
    ]);
  });
});
