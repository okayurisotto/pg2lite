import fs from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

export const loadTableDataFromBinaryFile = async (pglite: PGlite, table: { schema: string; name: string; file: string }): Promise<void> => {
  await pglite.exec(`COPY ${table.schema}.${table.name} FROM '/dev/blob' WITH (FORMAT BINARY)`, {
    blob: new Blob([await fs.readFile(table.file)]),
  });
};
