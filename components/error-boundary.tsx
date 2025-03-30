"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertTriangle } from "lucide-react"
import { logError } from "@/lib/error-handling"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary - Component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })

    // Log the error
    logError("ErrorBoundary", { error, errorInfo })

    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-background border border-border rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mx-auto mb-4">
                <AlertTriangle size={24} aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">Something went wrong</h2>
              <p className="text-muted-foreground text-center mb-6">
                We've encountered an unexpected error. Please try refreshing the page.
              </p>

              {process.env.NODE_ENV !== "production" && this.state.error && (
                <div className="mb-4 p-3 bg-muted rounded-md overflow-auto max-h-[200px] text-xs">
                  <p className="font-mono font-bold">{this.state.error.toString()}</p>
                  {this.state.errorInfo && <pre className="mt-2 font-mono">{this.state.errorInfo.componentStack}</pre>}
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button onClick={this.handleReset} variant="outline">
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()} className="gap-2">
                  <RefreshCw size={16} aria-hidden="true" />
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

