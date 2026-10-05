import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application rendering error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
          <button className="solid" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
