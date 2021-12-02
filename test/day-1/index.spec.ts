import { NotFoundResponse, SuccessfulResponse } from "@app/utils/response";
import { main1, main2 } from "@app/day-1";

describe("AdventOfCode 2021 - Day 1", () => {
  it("Return error for non existing file", async () => {
    const result = await main1('src/day-1/non-exists.txt')();
    const expected: NotFoundResponse = {
      _tag: "NotFoundResponse",
      code: 404,
      body: "ENOENT: no such file or directory, open 'src/day-1/non-exists.txt'"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 7 for first challenge", async () => {
    const result = await main1('test/day-1/input-1.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "7"
    };

    expect(result).toEqual(expected);
  });

  it("Return result 5 for second challenge", async () => {
    const result = await main2('test/day-1/input-1.txt')();
    const expected: SuccessfulResponse = {
      _tag: "SuccessfulResponse",
      code: 200,
      body: "5"
    };

    expect(result).toEqual(expected);
  });
});
