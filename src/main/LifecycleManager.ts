import type { Container } from 'inversify';
import { logger } from './shared/utilities/LoggerUtility';

/**
 * Manages application lifecycle and resource cleanup.
 * Handles shutdown hooks for resources that need explicit teardown, and SIGTERM/SIGINT handling.
 * Shutdown hooks are executed upon regular program exit, or SIGINT/SIGTERM.
 */
export class LifecycleManager {

  private static hasCleanedUp = false;

  private constructor() { }

  static registerSignalHandlers(): void {
    // Add SIGINT and SIGTERM handling here, if required; then call this method in the appropriate place
  }

  static registerShutdownHooks(container: Container): void {
    process.on('exit', (code) => {
      LifecycleManager.cleanupResources(container, `exit:${code}`);
    });
  }

  private static cleanupResources(_: Container, reason: string): void {
    if (LifecycleManager.hasCleanedUp) { return; }

    LifecycleManager.hasCleanedUp = true;

    try {
      // In the future, pull resources from the container and dispose them here.
      // Example: const client = container.get(MyClient); await client.close();
    } catch (error) {
      logger.error({ error: error }, 'Technical exception occurred at resource cleanup level');
    } finally {
      logger.debug({ reason: reason }, 'Shutdown sequence completed');
    }
  }
}
