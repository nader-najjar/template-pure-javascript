import 'reflect-metadata';
import type { Container } from 'inversify';
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
  LifecycleManager.registerShutdownHook();
  let container: Container | undefined = undefined;
  let exitCode = 0;

  try {
    container = createInversifyContainer();
    const executor = container.get(Executor);
    executor.execute(args);
  } catch (error) {
    logger.error({ error: error }, 'Technical exception occurred at software entrypoint level');
    exitCode = 1;
  } finally {
    // Close any resources here before the process exits.
    // Resources requiring cleanup should be declared before the try block so they are in scope.
    LifecycleManager.signalDone();
  }

  process.exit(exitCode);
}
