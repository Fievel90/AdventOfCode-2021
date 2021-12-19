import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-6";

describe("AdventOfCode 2021 - Day 6", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-6/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-6/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 5934 for first challenge with test input", async () => {
    const result = await main1('test/day-6/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "5934"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 26984457539 for second challenge with test input", async () => {
    const result = await main2('test/day-6/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "26984457539"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 355386 for first challenge with puzzle input", async () => {
    const result = await main1('src/day-6/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "355386"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 0 for second challenge with puzzle input", async () => {
    const result = await main2('src/day-6/input.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: ""
    };

    expect(result).toEqual(expected);
  });
});
