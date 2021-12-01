import * as RTE from "fp-ts/ReaderTaskEither";
import * as E from "fp-ts/Either";
import { readFile } from "@app/utils/file";
import { pipe } from "fp-ts/function";

describe("AdventOfCode 2021 - Try things", () => {
  it("ReaderTaskEither", async () => {
    const result = await pipe(
      'src/day-1/non-exists.txt',
      (file) => RTE.fromTaskEither(readFile(file)),
      RTE.map(a => {
        console.log(a);
        return a;
      }),
    )({ result: "" })();
    const expected = E.left("ENOENT: no such file or directory, open 'src/day-1/non-exists.txt'");

    expect(result).toEqual(expected);
  });
});
