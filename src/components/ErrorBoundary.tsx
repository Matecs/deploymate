import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">An unexpected error occurred. Please reload the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
