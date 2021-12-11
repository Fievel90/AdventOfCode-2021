import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-5";

describe("AdventOfCode 2021 - Day 5", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-5/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-5/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 5 for first challenge with test input", async () => {
    const result = await main1('test/day-5/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "5"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 12 for second challenge with test input", async () => {
    const result = await main2('test/day-5/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "12"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 5442 for first challenge with puzzle input", async () => {
    const result = await main1('src/day-5/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "5442"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 19571 for second challenge with puzzle input", async () => {
    const result = await main2('src/day-5/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "19571"
    };

    expect(result).toEqual(expected);
  });
});
