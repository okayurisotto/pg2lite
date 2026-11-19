import fs from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { loadConfig } from "./loadConfig.js";
import { saveSchema } from "./saveSchema.js";
import { loadSchema } from "./loadSchema.js";
import { getTableEntries } from "./getTableEntries.js";
import { saveTableDataToBinaryFile } from "./saveTableDataToBinaryFile.js";
import { loadTableDataFromBinaryFile } from "./loadTableDataFromBinaryFile.js";

const main = async () => {
  const config = loadConfig();

  await fs.mkdir(config.PG2LITE_OUT_DIR, { recursive: true });
  await fs.mkdir(config.schemaOutDir, { recursive: true });
  await fs.mkdir(config.dataOutDir, { recursive: true });
  await fs.mkdir(config.pgliteOutDir, { recursive: true });

  const pglite = new PGlite({
    dataDir: config.pgliteOutDir,
  });

  await pglite.waitReady;

  const { preDataSchemaFile, postDataSchemaFile } = await saveSchema(config);

  await loadSchema(pglite, preDataSchemaFile);

  const tableEntries = await getTableEntries(pglite);

  const tableWithFileEntries = await Promise.all(tableEntries.map(async (table) => ({
    ...table,
    file: await saveTableDataToBinaryFile(config, table),
  })));

  await Promise.all(tableWithFileEntries.map(async (table) => {
    await loadTableDataFromBinaryFile(pglite, table);
  }));

  await loadSchema(pglite, postDataSchemaFile);
};

await main();
