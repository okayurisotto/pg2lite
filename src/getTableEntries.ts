import { PGlite } from "@electric-sql/pglite";

export type TableEntry = {
  schema: string;
  name: string;
};

export const getTableEntries = async (pglite: PGlite): Promise<TableEntry[]> => {
  const results = await pglite.exec(`
    SELECT table_schema AS schema, table_name AS name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
    AND table_schema NOT IN ('pg_catalog', 'information_schema')
  `);

  return (results[0]?.rows ?? []) as TableEntry[];
};
