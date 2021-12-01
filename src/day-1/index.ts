import { flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { readFile } from "@app/utils/file";

export const main = flow(
  readFile,
  TE.map((a: string) => a.split("\n")),
  TE.traverseArray((a: string) => a)
);
