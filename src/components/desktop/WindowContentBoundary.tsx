import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

/** A failed on-demand app should not take down the desktop or other windows. */
export class WindowContentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unable to open portfolio app', error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="window-error" role="alert">
          <RefreshCw size={25} />
          <h2>This app couldn’t open.</h2>
          <p>Check your connection, then reload the workspace to try again.</p>
          <button className="desktop-button desktop-button-primary" onClick={() => window.location.reload()}>Reload workspace</button>
        </div>
      );
    }
    return this.props.children;
  }
}
