import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-2";

describe("AdventOfCode 2021 - Day 2", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-2/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-2/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 150 for first challenge with test input", async () => {
    const result = await main1('test/day-2/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "150"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 900 for second challenge with test input", async () => {
    const result = await main2('test/day-2/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "900"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 1924923 for first challenge with puzzle input", async () => {
    const result = await main1('src/day-2/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "1924923"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 1982495697 for second challenge with puzzle input", async () => {
    const result = await main2('src/day-2/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "1982495697"
    };

    expect(result).toEqual(expected);
  });
});
