import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";
import { Command, Position, Position3d } from "@app/day-2/submarine"

const parseCommand = (command: string) => {
  const [action, value] = command.split(" ")
  return Command.decode({ action, value: parseInt(value, 10) });
}

const moveSubmarine = (commands: readonly Command[]): Position =>
  commands.reduce((carry, command: Command) => {
    switch (command.action) {
      case 'forward':
        carry.horizontal += command.value;
        break;
      case 'down':
        carry.depth += command.value;
        break;
      case 'up':
        carry.depth -= command.value;
        break;
    }

    return carry;
  }, { horizontal: 0, depth: 0 })

const moveSubmarine3d = (commands: readonly Command[]): Position3d =>
  commands.reduce((carry, command: Command) => {
    switch (command.action) {
      case 'forward':
        carry.horizontal += command.value;
        carry.depth += carry.aim * command.value;
        break;
      case 'down':
        carry.aim += command.value;
        break;
      case 'up':
        carry.aim -= command.value;
        break;
    }

    return carry;
  }, { horizontal: 0, depth: 0, aim: 0 })

export const main1 = flow(
  readFile,
  TE.map(a => a.split("\n")),
  TE.map(A.map(parseCommand)),
  TE.chainEitherKW(E.sequenceArray),
  TE.map(moveSubmarine),
  TE.map(a => a.horizontal * a.depth),
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
  TE.map(A.map(parseCommand)),
  TE.chainEitherKW(E.sequenceArray),
  TE.map(moveSubmarine3d),
  TE.map(a => a.horizontal * a.depth),
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
