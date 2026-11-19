import path from "node:path";
import { Config } from "./loadConfig.js";
import { run } from "./run.js";

const saveSchemaSection = async (config: Config, section: "pre-data" | "post-data") => {
  const filepath = path.join(config.schemaOutDir, `${section}.sql`);

  const result = await run(
    "/usr/bin/pg_dump",
    [
      "-h", config.PG2LITE_HOST,
      "-p", config.PG2LITE_PORT,
      "-U", config.PG2LITE_USERNAME,
      "-d", config.PG2LITE_DATABASE,
      `--section=${section}`,
      "--no-owner",
      "--no-privileges",
      "-f", filepath,
    ],
    {
      stdio: "inherit",
      env: {
        PGPASSWORD: config.PG2LITE_PASSWORD,
      },
    }
  );

  if (result.code !== 0) {
    throw new Error(`pg_dump failed: ${section}`);
  }

  return filepath;
};

export const saveSchema = async (config: Config) => {
  const preDataSchemaFile = await saveSchemaSection(config, "pre-data");
  const postDataSchemaFile = await saveSchemaSection(config, "post-data");

  return { preDataSchemaFile, postDataSchemaFile };
};
