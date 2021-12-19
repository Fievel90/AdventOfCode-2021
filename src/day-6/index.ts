import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as A from "fp-ts/Array";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";

const parseRow = (row: string): number[] => row.split(",").map(a => parseInt(a.trim(), 10));

const spawnFish = () => 8;

const nextCycle = () => 6;

const decrement = (a: number): number => a - 1;

const passDay = (fishes: number[]): number[] => {
  fishes = pipe(
    fishes,
    A.map(decrement)
  );

  const fishesToAdd = fishes.filter(a => a < 0).length;
  const newFishes: number[] = Array(fishesToAdd).fill(spawnFish());

  return pipe(
    fishes,
    A.map(a => a < 0 ? nextCycle() : a),
    A.concat(newFishes)
  );
};

const passDays = (nDays: number) => (fishes: number[]): number[] => {
  for (let i = 0; i < nDays; ++i) {
    fishes = passDay(fishes);
  }
  return fishes;
}

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.chainOptionK(() => "Missing first line")(A.head),
  TE.map(parseRow),
  TE.map(passDays(80)),
  TE.map(a => a.length),
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
  TE.chainOptionK(() => "Missing first line")(A.head),
  TE.map(parseRow),
  TE.map(passDays(80)),
  // TE.map(passDays(256)),
  TE.map(a => a.length),
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
