import type { Result } from "$server/types.js";
import type z from "zod";

export function parseInteger(arg: string | undefined): Result<number, string> {
  if (!arg)
    return [null, "Invalid input."];

  const x = +arg;

  if (isNaN(x) || !isFinite(x) || !Number.isInteger(x))
    return [null, "Invalid number."];

  return [x, null];
}

export function formatIssues(issues: z.ZodError["issues"]): SchemaIssue[] {
  return issues.map(({ path, message }) => ({
    property: path[0] as string,
    message
  }));
}

export type SchemaIssue = {
  property: string;
  message: string;
};