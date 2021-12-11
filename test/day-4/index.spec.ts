import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-4";

describe("AdventOfCode 2021 - Day 4", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-4/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-4/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 4512 for first challenge with test input", async () => {
    const result = await main1('test/day-4/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "4512"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 1924 for second challenge with test input", async () => {
    const result = await main2('test/day-4/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "1924"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 25023 for first challenge with puzzle input", async () => {
    const result = await main1('src/day-4/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "25023"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 2634 for second challenge with puzzle input", async () => {
    const result = await main2('src/day-4/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "2634"
    };

    expect(result).toEqual(expected);
  });
});
