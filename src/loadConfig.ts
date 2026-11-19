import path from "node:path";

export type Config = {
  PG2LITE_HOST: string;
  PG2LITE_PORT: string;
  PG2LITE_USERNAME: string;
  PG2LITE_PASSWORD: string;
  PG2LITE_DATABASE: string;
  PG2LITE_OUT_DIR: string;

  schemaOutDir: string;
  dataOutDir: string;
  pgliteOutDir: string;
};

export const loadConfig = (): Config => {
  const PG2LITE_HOST = process.env["PG2LITE_HOST"];
  if (PG2LITE_HOST === undefined) throw new Error(`\`process.env["PG2LITE_HOST"]\` is undefined.`);

  const PG2LITE_PORT = process.env["PG2LITE_PORT"];
  if (PG2LITE_PORT === undefined) throw new Error(`\`process.env["PG2LITE_PORT"]\` is undefined.`);

  const PG2LITE_USERNAME = process.env["PG2LITE_USERNAME"];
  if (PG2LITE_USERNAME === undefined) throw new Error(`\`process.env["PG2LITE_USERNAME"]\` is undefined.`);

  const PG2LITE_PASSWORD = process.env["PG2LITE_PASSWORD"];
  if (PG2LITE_PASSWORD === undefined) throw new Error(`\`process.env["PG2LITE_PASSWORD"]\` is undefined.`);

  const PG2LITE_DATABASE = process.env["PG2LITE_DATABASE"];
  if (PG2LITE_DATABASE === undefined) throw new Error(`\`process.env["PG2LITE_DATABASE"]\` is undefined.`);

  const PG2LITE_OUT_DIR = process.env["PG2LITE_OUT_DIR"];
  if (PG2LITE_OUT_DIR === undefined) throw new Error(`\`process.env["PG2LITE_OUT_DIR"]\` is undefined.`);

  const schemaOutDir = path.join(PG2LITE_OUT_DIR, "schema");

  const dataOutDir = path.join(PG2LITE_OUT_DIR, "data");

  const pgliteOutDir = path.join(PG2LITE_OUT_DIR, "pglite");

  return {
    PG2LITE_HOST,
    PG2LITE_PORT,
    PG2LITE_USERNAME,
    PG2LITE_PASSWORD,
    PG2LITE_DATABASE,
    PG2LITE_OUT_DIR,

    schemaOutDir,
    dataOutDir,
    pgliteOutDir,
  };
};
