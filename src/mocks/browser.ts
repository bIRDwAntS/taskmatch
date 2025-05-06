import { setupWorker } from 'msw/browser';
import { userHandlers } from './handlers/user.handlers';

// MSW service worker configuration for browser environment
// Combines all available handlers
interface MockServiceWorkerOptions { //TS strict
    onUnhandledRequest: 'bypass' | 'warn' | 'error';
    quiet?: boolean;
  }

export const worker = setupWorker(
  ...userHandlers,
  // if not MVP we can add more handlers
);

// mock service worker initialization function
// @param options - Configuration options
export async function startMockServiceWorker(options: MockServiceWorkerOptions = { onUnhandledRequest: 'bypass' as const }) {
    // In development AND test environment
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') try {
        await worker.start(options);
        console.log('%c[MSW] Mock API activée', 'color: green; font-weight: bold;');
      } catch (error) {
        console.error('%c[MSW] Échec activation', 'color: red; font-weight: bold;', error);
      }
  }