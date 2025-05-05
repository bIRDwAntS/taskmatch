import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'

async function mountApp() {
  if (process.env.NODE_ENV === 'development') {
    const { startMockServiceWorker } = await import('./mocks/browser');
    await startMockServiceWorker();
  }

  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

mountApp();