import { pipe } from "fp-ts/function";
import * as S from "fp-ts/State";

interface Config {
  multiplier: number
  logs: string[]
}

describe("Testing FP-TS - State", () => {
  it("Chain", () => {
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

  it("Map", () => {
    const multiply = (init: number): S.State<Config, number> => pipe(
      S.modify<Config>(config => ({
        ...config,
        logs: [
          ...config.logs,
          `Multiplying ${init} * 2`
        ]
      })),
      S.apSecond(S.get<Config>()),
      S.map(config => init * config.multiplier),
    );

    const main = pipe(
      2,
      a => S.of<Config, number>(a),
      S.chain(multiply),
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
