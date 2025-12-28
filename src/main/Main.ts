import 'reflect-metadata';
import { createInversifyContainer } from './bootstrap/injection/Container';
import { Executor } from './bootstrap/logic/Executor';
import { LifecycleManager } from './LifecycleManager';
import { logger } from './shared/utilities/LoggerUtility';

/**
 * Application entry point.
 *
 * The following modules should not have direct unit tests - smoke or composition tests are preferred instead:
 *   - Main.ts
 *   - LifecycleManager.ts
 *   - bootstrap/injection/*
 */
if (require.main === module) {
  main(process.argv.slice(2));
}

export function main(args: string[]): void {
  try {
    const container = createInversifyContainer();
    const executor = container.get(Executor);
    LifecycleManager.registerShutdownHooks(container);

    executor.execute(args);
  } catch (error) {
    safeCleanup(error);
    process.exit(1);
  }
}

function safeCleanup(error: unknown): void {
  logger.error({ error: error }, 'Technical exception occurred at software entrypoint level');
}
