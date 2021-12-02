import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import * as t from "io-ts";
import { readFile } from "@app/utils/file";
import { NotFoundResponse, Response, SuccessfulResponse } from "@app/utils/response";

const Command = t.type({
  action: t.union([
    t.literal('forward'),
    t.literal('down'),
    t.literal('up')
  ]),
  value: t.number
})
type Command = t.TypeOf<typeof Command>

interface Position {
  horizontal: number
  depth: number
}

interface Position3d {
  horizontal: number
  depth: number
  aim: number
}

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
  TE.map(a => a),
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

main1('src/day-2/input.txt')()
  .then(a => console.log('First', a))
  .catch(a => console.log('First', a));

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

main2('src/day-2/input.txt')()
  .then(a => console.log('Second', a))
  .catch(a => console.log('Second', a));
