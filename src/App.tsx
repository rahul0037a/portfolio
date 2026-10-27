import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { OSProvider } from './context/OSContext';
import { DesktopCanvas } from './components/desktop/DesktopCanvas';
import { MotionConfig } from 'framer-motion';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <OSProvider>
        <DesktopCanvas />
        <Analytics />
      </OSProvider>
    </MotionConfig>
  );
}

export default App;
