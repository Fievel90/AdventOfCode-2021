import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-3";

describe("AdventOfCode 2021 - Day 3", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-3/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-3/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 198 for first challenge with test input", async () => {
    const result = await main1('test/day-3/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "198"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 230 for second challenge with test input", async () => {
    const result = await main2('test/day-3/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "230"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 4139586 for first challenge with puzzle input", async () => {
    const result = await main1('src/day-3/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "4139586"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 1800151 for second challenge with puzzle input", async () => {
    const result = await main2('src/day-3/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "1800151"
    };

    expect(result).toEqual(expected);
  });
});
