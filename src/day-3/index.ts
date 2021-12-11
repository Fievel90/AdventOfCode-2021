import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as A from "fp-ts/Array";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";
import { transposeRowsAndColumns } from "@app/utils/matrix";

const mostCommonBit = (matrix: string[][]) =>
  matrix.map(column =>
    column.filter(a => a === "1").length >= column.filter(a => a === "0").length ? "1" : "0"
  ).join("");

const leastCommonBit = (matrix: string[][]) =>
  matrix.map(column =>
    column.filter(a => a === "1").length >= column.filter(a => a === "0").length ? "0" : "1"
  ).join("");

const recursiveCommonBit = (matrix: string[][], algorithm: CallableFunction, index: number = 0): string => {
  if (matrix.length === 1) {
    return matrix[0].join("");
  }

  const transposed = transposeRowsAndColumns(matrix)[index];
  const mcb = algorithm([transposed]);

  return recursiveCommonBit(matrix.filter(row => row[index] === mcb), algorithm, ++index);
};

const gammaRate = (matrix: string[][]) => parseInt(mostCommonBit(matrix), 2);

const epsilonRate = (matrix: string[][]) => parseInt(leastCommonBit(matrix), 2);

const oxygenGeneratorRating = (matrix: string[][]) => parseInt(recursiveCommonBit(matrix, mostCommonBit), 2);

const CO2ScrubberRating = (matrix: string[][]) => parseInt(recursiveCommonBit(matrix, leastCommonBit), 2);

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.map(A.map(a => a.split(""))),
  TE.map(transposeRowsAndColumns),
  TE.map(a => ([gammaRate(a), epsilonRate(a)])),
  TE.map(A.reduce(1, (carry, a) => carry * a)),
  TE.fold(
    (e): T.Task<Response> => (): Promise<NotFoundResponse> => Promise.resolve({
      _tag: "NotFoundResponse",
      code: 404,
      body: String(e)
    }),
    (a): T.Task<Response> => (): Promise<SuccessfulResponse> => Promise.resolve({
      _tag: "SuccessfulResponse",
      code: 200,
      body: String(a)
    })
  )
);

export const main2 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.map(A.map(a => a.split(""))),
  TE.map(a => ([oxygenGeneratorRating(a), CO2ScrubberRating(a)])),
  TE.map(A.reduce(1, (carry, a) => carry * a)),
  TE.fold(
    (e): T.Task<Response> => (): Promise<NotFoundResponse> => Promise.resolve({
      _tag: "NotFoundResponse",
      code: 404,
      body: String(e)
    }),
    (a): T.Task<Response> => (): Promise<SuccessfulResponse> => Promise.resolve({
      _tag: "SuccessfulResponse",
      code: 200,
      body: String(a)
    })
  )
);
