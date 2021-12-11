import * as t from "io-ts";
import { Eq } from "fp-ts/Eq";

export const Point = t.type({
  x: t.number,
  y: t.number
});
export type Point = t.TypeOf<typeof Point>;

export const Line = t.type({
  start: Point,
  end: Point
});
export type Line = t.TypeOf<typeof Line>;

export const EqPoint: Eq<Point> = {
  equals: (a, b) => a.x === b.x && a.y === b.y
}
