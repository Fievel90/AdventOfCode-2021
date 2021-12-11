import { flow, pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Ord";
import * as t from "io-ts";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";
import { Bingo, Board, BoardNumber, Winner } from "@app/day-4/bingo"
import { getMatrixColumn, getMatrixRow } from "@app/utils/matrix";

const parseBingo = (rows: string[]): E.Either<t.Errors, Bingo> => {
  const drawnNumbers = rows[0].split(",").map(a => parseInt(a.trim(), 10));

  const boards = rows.slice(2).reduce((carry, row) => {
    const numbers = row.trim().split(" ")
      .map(a => parseInt(a.trim(), 10))
      .filter(a => !isNaN(a))
      .map(a => ({ drawn: false, value: a }));

    if (numbers.length === 0) {
      carry.splice(0, 0, []);
    } else {
      carry[0].push([...numbers]);
    }

    return carry;
  }, [[]] as Board[]);

  return Bingo.decode({ drawnNumbers, boards });
}

const flagDrawnNumberOnRow = (drawnNumber: number) => (row: BoardNumber[]): BoardNumber[] =>
  pipe(
    row,
    A.map(column => ({ ...column, drawn: column.drawn || column.value === drawnNumber }))
  );

const flagDrawnNumberOnBoard = (drawnNumber: number) => (board: Board): Board =>
  pipe(
    board,
    A.map(flagDrawnNumberOnRow(drawnNumber))
  );

const flagDrawnNumberOnBoards = (drawnNumber: number) => (boards: Board[]): Board[] =>
  pipe(
    boards,
    A.map(flagDrawnNumberOnBoard(drawnNumber))
  );

const isCompleted = (row: BoardNumber[]): boolean =>
  row.length === row.filter(column => column.drawn).length

const isBoardCompleted = (board: Board): boolean =>
  board.filter((_, i) => {
    const row = getMatrixRow<BoardNumber>(i)(board);
    const column = getMatrixColumn<BoardNumber>(i)(board);

    return isCompleted(row) || isCompleted(column);
  }).length > 0;

const findIndexes = <T>(predicate: (value: T, index: number) => boolean) => (array: T[]): number[] =>
  array
    .map((value, index) => predicate(value, index) ? index : undefined)
    .filter(a => a !== undefined) as number[];

const draw = (drawnNumbers: number[], boards: Board[], winners: Winner[]): E.Either<never, Winner[]> => {
  if (drawnNumbers.length === 0 || boards.length === 0) {
    return E.right(winners);
  }

  const currentNumber = drawnNumbers[0];

  boards = pipe(
    boards,
    flagDrawnNumberOnBoards(currentNumber)
  );

  const winnerIndexes = pipe(
    boards,
    findIndexes(isBoardCompleted),
    A.sort(O.ordNumber)
  ).reverse();

  winners = winners.concat(winnerIndexes.map(winnerIndex => {
    const winner = boards[winnerIndex];
    boards.splice(winnerIndex, 1);

    return { drawnNumber: currentNumber, board: winner };
  }));

  return draw(drawnNumbers.slice(1), boards, winners);
}

const execute = (game: Bingo) => draw(game.drawnNumbers, game.boards, []);

const calculateScore = (winner: Winner) => {
  const remainingNumbers = winner.board.flatMap((a: BoardNumber[]) => a.filter(b => b.drawn === false));

  return winner.drawnNumber * remainingNumbers.reduce((carry, a) => carry + a.value, 0);
}

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.chainEitherK<string|t.Errors, string[], Bingo>(parseBingo),
  TE.chainEitherK<string|t.Errors, Bingo, Winner[]>(execute),
  TE.chainOptionK<string|t.Errors>(() => "There isn't any winner")(A.head),
  TE.map(calculateScore),
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
  TE.chainEitherK<string|t.Errors, string[], Bingo>(parseBingo),
  TE.chainEitherK<string|t.Errors, Bingo, Winner[]>(execute),
  TE.chainOptionK<string|t.Errors>(() => "There isn't any winner")(A.last),
  TE.map(calculateScore),
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
