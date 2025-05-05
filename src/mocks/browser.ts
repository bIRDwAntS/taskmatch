import { setupWorker } from 'msw/browser';
import { userHandlers } from './handlers/user.handlers';

/**
 * Configuration du service worker MSW pour l'environnement navigateur
 * Combine tous les handlers disponibles
 */

interface MockServiceWorkerOptions { //TS strict
    onUnhandledRequest: 'bypass' | 'warn' | 'error';
    quiet?: boolean;
  }

export const worker = setupWorker(
  ...userHandlers,
  // if not MVP we can add more handlers
);

/**
 * Fonction d'initialisation du mock service worker
 * @param options - Options de configuration
 */
export async function startMockServiceWorker(options: MockServiceWorkerOptions = { onUnhandledRequest: 'bypass' as const }) {
    // En environnement de développement ET de test
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') try {
        await worker.start(options);
        console.log('%c[MSW] Mock API activée', 'color: green; font-weight: bold;');
      } catch (error) {
        console.error('%c[MSW] Échec activation', 'color: red; font-weight: bold;', error);
      }
  }