import type { Result } from "$server/types.js";
import { formatIssues, type SchemaIssue } from "$server/utils/type-formatting.js";
import * as z from "zod";

const SupplierCreationSchema = z.object({
  name: z
    .string("chaine de caractères attendue")
    .nonempty("champ vide non autorisé")
    .max(25, "max. 25 caractères"),
  street: z
    .string("chaine de caractères attendue")
    .max(255, "max. 255 caractères"),
  city: z
    .string("chaine de caractères attendue")
    .max(50, "max. 50 caractères"),
  postalCode: z
    .string("chaine de caractères attendue")
    .max(10, "max. 10 caractères"),
  landlinePhone: z
    .string("chaine de caractères attendue")
    .max(20, "max. 20 caractères")
    .nullable(),
  cellPhone: z
    .string("chaine de caractères attendue")
    .max(20, "max. 20 caractères")
    .nullable(),
  email: z
    .email("adresse email attendue")
    .max(255, "max. 255 caractères")
    .nullable()
});

const SupplierUpdateSchema = SupplierCreationSchema.partial();

export function parseSupplierCreationData(data: unknown): Result<SupplierCreationData, SchemaIssue[]> {
  const parseResult = SupplierCreationSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

export function parseSupplierUpdateData(data: unknown): Result<SupplierUpdateData, SchemaIssue[]> {
  const parseResult = SupplierUpdateSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

type SupplierCreationData = z.infer<typeof SupplierCreationSchema>;
type SupplierUpdateData = z.infer<typeof SupplierUpdateSchema>;