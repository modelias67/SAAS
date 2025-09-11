import * as z from "zod";

const ClientCreationSchema = z.object({
  firstName: z
    .string("chaine de caractères attendue")
    .nonempty("champ vide non autorisé")
    .max(25, "max. 25 caractères"),
  lastName: z
    .string("chaine de caractères attendue")
    .nonempty("champ vide non autorisé")
    .max(25, "max. 25 caractères"),
  title: z.enum(["M.", "Mme", "autre"], "valeur attendue : \"Mr\" | \"Mme\" | \"autre\""),
  entityType: z.enum(["physique", "moral"], "valeur attendue : \"physique\" | \"moral\"")
});