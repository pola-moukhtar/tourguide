import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps { children: ReactNode }
interface ErrorBoundaryState { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('A page section failed to render.', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return <main className="error-page"><h1>This page could not be displayed.</h1><p>Please refresh the page to try again.</p><button type="button" onClick={() => window.location.reload()}>Refresh page</button></main>;
    return this.props.children;
  }
}
