import React from 'react';
import { OSProvider } from './context/OSContext';
import { DesktopCanvas } from './components/desktop/DesktopCanvas';

export function App() {
  return (
    <OSProvider>
      <DesktopCanvas />
    </OSProvider>
  );
}

export default App;
