import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { readFile } from "@app/utils/file";

const countMeasurements = (list: number[]): number =>
  list
    .filter((value, index, array) => value > array[index - 1])
    .length;

const mapMeasurements = (list: number[]): number[] =>
  list
    .map((value, index, array) => value + array[index - 1] + array[index - 2]);

export const main1 = flow(
  readFile,
  TE.map((a: string) => a.split("\n")),
  TE.map((a: string[]) => a.map(a => parseInt(a, 10))),
  TE.map(countMeasurements),
);

main1('src/day-1/input.txt')()
  .then(a => console.log('First', a))
  .catch(a => console.log('First', a));

export const main2 = flow(
  readFile,
  TE.map((a: string) => a.split("\n")),
  TE.map((a: string[]) => a.map(a => parseInt(a, 10))),
  TE.map(mapMeasurements),
  TE.map(countMeasurements),
);

main2('src/day-1/input.txt')()
  .then(a => console.log('Second', a))
  .catch(a => console.log('Second', a));
