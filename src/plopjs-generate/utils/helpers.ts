import * as changeCase from "change-case";

export const cwd = (): string => process.cwd();

export const componentCase = (name: string): string =>
  changeCase.pascalCase(name.split("/").slice(-1)[0]);

export const fileCase = (name: string): string =>
  changeCase.paramCase(name.split("/").slice(-1)[0]);

export const pathHelper = (prefix: Array<string>) => (
  folder: string,
  file: string
): string => {
  const segments = folder.split("/").map((s) => fileCase(s));
  const lastSegment = segments[segments.length - 1];
  const path = [
    ...prefix,
    segments.join("/"),
    typeof file === "string" ? fileCase(file) : lastSegment,
  ];

  return path.join("/");
};

// eslint-disable-next-line no-console
export const debug = (...inputs: string[]): void => console.log(inputs);

export const NamedImport = (...inputs: string[]): string => {
  const arrayInput = inputs.filter(Array.isArray).flatMap((x) => x);
  return arrayInput.length > 0 ? `, {${arrayInput.join(", ")}}` : "";
};

export const Contains = (arr: string[], compare: string): boolean =>
  arr && arr.some((x) => x === compare);

const BaseHelpers = {
  cwd,
  cwdPath: pathHelper([cwd()]),
  path: pathHelper([]),
  componentCase,
  fileCase,
  debug,
  NamedImport,
  Contains,
};

export default BaseHelpers;
