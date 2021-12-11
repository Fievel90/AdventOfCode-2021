import * as IO from "io-ts";

export const Command = IO.type({
  action: IO.union([
    IO.literal('forward'),
    IO.literal('down'),
    IO.literal('up')
  ]),
  value: IO.number
})
export type Command = IO.TypeOf<typeof Command>

export interface Position {
  horizontal: number
  depth: number
}

export interface Position3d {
  horizontal: number
  depth: number
  aim: number
}
