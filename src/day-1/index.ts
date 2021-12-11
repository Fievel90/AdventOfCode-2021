import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";

const countMeasurements = (list: ReadonlyArray<number>): number =>
  list
    .filter((value, index, array) => value > array[index - 1])
    .length;

const mapMeasurements = (list: ReadonlyArray<number>): ReadonlyArray<number> =>
  list
    .map((value, index, array) => value + array[index - 1] + array[index - 2]);

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.map(a => a.map(a => parseInt(a, 10))),
  TE.map(countMeasurements),
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
  TE.map(a => a.map(a => parseInt(a, 10))),
  TE.map(mapMeasurements),
  TE.map(countMeasurements),
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
