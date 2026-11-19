import path from "node:path";
import { TableEntry } from "./getTableEntries.js";
import { Config } from "./loadConfig.js";
import { run } from "./run.js";

export const saveTableDataToBinaryFile = async (config: Config, table: TableEntry): Promise<string> => {
  const tableId = `${table.schema}.${table.name}`;
  const filepath = path.join(config.dataOutDir, `${tableId}.bin`);

  const { code } = await run(
    "/usr/bin/psql",
    [
      "-h", config.PG2LITE_HOST,
      "-p", config.PG2LITE_PORT,
      "-U", config.PG2LITE_USERNAME,
      "-d", config.PG2LITE_DATABASE,
      "-c", `\\copy ${tableId} TO '${filepath}' WITH (FORMAT BINARY)`,
    ],
    {
      stdio: "inherit",
      env: {
        PGPASSWORD: config.PG2LITE_PASSWORD,
      },
    }
  );

  if (code !== 0) {
    throw new Error(`psql failed: ${tableId}`);
  }

  return filepath;
};
