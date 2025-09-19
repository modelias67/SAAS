import InvoiceStatus from "$server/entities/Invoice/InvoiceStatus.js";
import type { Result } from "$server/types.js";
import { formatIssues, type SchemaIssue } from "$server/utils/type-formatting.js";
import z from "zod";

const InvoiceCreationSchema = z.object({
  status: z.enum(
    InvoiceStatus,
    `valeur attendue : "${InvoiceStatus.Estimate}" | "${InvoiceStatus.Invoice}"`
  ),
  technicalVisitDate: z.coerce.date("date attendue"),
  installationDate: z.coerce.date("date attendue"),
  clientId: z
    .int("entier positif attendu")
    .positive("entier positif attendu")
    .nullable(),
  itemId: z
    .int("entier positif attendu")
    .positive("entier positif attendu")
    .nullable()
});

const InvoiceUpdateSchema = InvoiceCreationSchema.partial();

export function parseInvoiceCreationData(data: unknown): Result<InvoiceCreationData, SchemaIssue[]> {
  const parseResult = InvoiceCreationSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

export function parseInvoiceUpdateData(data: unknown): Result<InvoiceUpdateData, SchemaIssue[]> {
  const parseResult = InvoiceUpdateSchema.safeParse(data);

  return parseResult.success
    ? [parseResult.data, null]
    : [null, formatIssues(parseResult.error.issues)];
}

type InvoiceCreationData = z.infer<typeof InvoiceCreationSchema>;
type InvoiceUpdateData = z.infer<typeof InvoiceUpdateSchema>;