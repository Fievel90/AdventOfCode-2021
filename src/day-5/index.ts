import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as t from "io-ts";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";
import { Line, Point } from "@app/day-5/lines";

const parseRow = (row: string): E.Either<t.Errors, Line> => {
  const [start, end] = row.split("->").map(a => a.trim());
  const [startX, startY] = start.split(",").map(a => a.trim());
  const [endX, endY] = end.split(",").map(a => a.trim());

  return Line.decode({
    start: {
      x: parseInt(startX, 10),
      y: parseInt(startY, 10)
    },
    end: {
      x: parseInt(endX, 10),
      y: parseInt(endY, 10)
    }
  });
};

const filterHorizontal = (lines: readonly Line[]): Line[] => lines.filter(a => a.start.x === a.end.x);
const filterVertical = (lines: readonly Line[]): Line[] => lines.filter(a => a.start.y === a.end.y);

const increment = (a: number) => a + 1;
const decrement = (a: number) => a - 1;
const abstain = (a: number) => a;

const lte = (a: number, b: number) => a <= b;
const gte = (a: number, b: number) => a >= b;

const extractPointsFromLine = (line: Line): Point[] => {
  const points: Point[] = [];

  const xFunc = line.start.x < line.end.x
    ? increment
    : (line.start.x > line.end.x ? decrement : abstain);

  const xCheckFunc = line.start.x < line.end.x ? lte : gte;

  const yFunc = line.start.y < line.end.y
    ? increment
    : (line.start.y > line.end.y ? decrement : abstain);

  const yCheckFunc = line.start.y < line.end.y ? lte : gte;

  for (
    let i = line.start.x, j = line.start.y;
    xCheckFunc(i, line.end.x) && yCheckFunc(j, line.end.y);
    i = xFunc(i), j = yFunc(j)
  ) {
    points.push({
      x: i,
      y: j
    });
  }

  return points;
};

const intersectLines = (lines: Point[][]): Point[] =>
  pipe(
    lines,
    A.flatten,
    A.reduce(new Map<string, { point: Point, occurrences: number }>(), (acc, a) => {
      const key = `x: ${a.x}, y: ${a.y}`;
      const current = pipe(
        acc.get(key),
        O.fromNullable,
        O.getOrElse(() => ({ point: a, occurrences: 0 }))
      )

      acc.set(key, {
        point: a,
        occurrences: current.occurrences + 1
      });

      return acc;
    }),
    (a) => Array.from(a),
    A.filter(([_, { occurrences }]) => {
      return occurrences > 1;
    }),
    A.map(([_, { point }]) => point)
  );

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.map(A.map(parseRow)),
  TE.chainEitherKW(E.sequenceArray),
  TE.map(a => A.concat(filterHorizontal(a))(filterVertical(a))),
  TE.map(A.map(extractPointsFromLine)),
  TE.map(intersectLines),
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
  TE.map(A.map(parseRow)),
  TE.chainEitherKW(E.sequenceArray),
  TE.map(a => [...a]),
  TE.map(A.map(extractPointsFromLine)),
  TE.map(intersectLines),
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
