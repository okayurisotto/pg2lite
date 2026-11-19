import fs from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

export const loadSchema = async (pglite: PGlite, schemaFile: string): Promise<void> => {
  const schema = await fs.readFile(schemaFile, "utf-8");

  const cleanSchema = schema
    .replace(/^\\restrict \w+$/um, "")
    .replace(/^\\unrestrict \w+$/um, "")
    ;

  await pglite.exec(cleanSchema);
};
