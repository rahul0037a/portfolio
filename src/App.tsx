import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { OSProvider } from './context/OSContext';
import { DesktopCanvas } from './components/desktop/DesktopCanvas';

export function App() {
  return (
    <OSProvider>
      <DesktopCanvas />
      <Analytics />
    </OSProvider>
  );
}

export default App;
