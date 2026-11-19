import { spawn, SpawnOptions } from 'node:child_process';
import { once } from 'node:events';

export const run = async (
  command: string,
  args: readonly string[],
  options: SpawnOptions,
): Promise<{ code: any; signal: any }> => {
  const child = spawn(command, args, options);

  const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'] as const;

  const forwardSignal = (signal: NodeJS.Signals): void => {
    child.kill(signal);
  };

  for (const signal of signals) {
    process.on(signal, forwardSignal);
  }

  try {
    const result = await once(child, 'close');

    return {
      code: result[0],
      signal: result[1],
    };
  } finally {
    for (const signal of signals) {
      process.off(signal, forwardSignal);
    }
  }
};
