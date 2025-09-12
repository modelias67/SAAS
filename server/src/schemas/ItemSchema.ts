import type { Result } from "$server/types.js";
import { formatIssues, type SchemaIssue } from "$server/utils/type-formatting.js";
import * as z from "zod";

const ItemCreationSchema = z.object({
  shortDesignation: z
    .string({ error: "chaine de caractères attendue" })
    .nonempty({ error: "ne peut pas être vide" })
    .max(100, { error: "max. 100 caractères" }),
  commercialDesignation: z
    .string({ error: "chaine de caractères attendue" })
    .nonempty({ error: "ne peut pas être vide" }),
  supplierId: z
    .int({ error: "entier positif attendu" })
    .positive({ error: "entier positif attendu" })
    .nullable()
});

const ItemUpdateSchema = ItemCreationSchema.partial();

export function parseItemCreationData(data: unknown): Result<ItemCreationData, SchemaIssue[]> {
  const parseResult = ItemCreationSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

export function parseItemUpdateData(data: unknown): Result<ItemUpdateData, SchemaIssue[]> {
  const parseResult = ItemUpdateSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

type ItemCreationData = z.infer<typeof ItemCreationSchema>;
type ItemUpdateData = z.infer<typeof ItemUpdateSchema>;