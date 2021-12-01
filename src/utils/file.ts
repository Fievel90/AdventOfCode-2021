import * as TE from "fp-ts/TaskEither";
import * as fs from "fs";

export const readFile = (file: string) => TE.tryCatch(
  () => fs.promises.readFile(file, { encoding: "utf8" }),
  e => (e as NodeJS.ErrnoException)?.message || 'Read Error'
);
