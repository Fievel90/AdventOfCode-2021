import * as t from "io-ts";
import * as E from "fp-ts/Either";

const EqualLength = (a: number) =>
  new t.Type<any[], any[], unknown>(
    "EqualLength",
    t.Array.is,
    (u, c) =>
      E.either.chain(t.Array.validate(u, c), (s) =>
        s.length >= a ? t.success(s) : t.failure(s, c)
      ),
    Array
  );

export const BoardNumber = t.type({
  value: t.number,
  drawn: t.boolean
});
export type BoardNumber = t.TypeOf<typeof BoardNumber>;

export const Board = t.array(
  t.array(BoardNumber).pipe(EqualLength(5))
).pipe(EqualLength(5));
export type Board = t.TypeOf<typeof Board>;

export const Bingo = t.type({
  drawnNumbers: t.array(t.number),
  boards: t.array(Board),
});
export type Bingo = t.TypeOf<typeof Bingo>;

export const Winner = t.type({
  drawnNumber: t.number,
  board: Board,
});
export type Winner = t.TypeOf<typeof Winner>;
