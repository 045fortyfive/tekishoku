import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 safe-area-left safe-area-right">
          <div className="bg-white rounded-xl p-6 mobile-shadow-lg max-w-md w-full text-center">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              予期しないエラーが発生しました
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              申し訳ございません。アプリケーションでエラーが発生しました。
              ページを再読み込みしてもう一度お試しください。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
              >
                ページを再読み込み
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-800 font-semibold py-3 px-6 rounded-lg mobile-transition touch-target"
              >
                ホームに戻る
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-slate-500">
                  エラー詳細（開発用）
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
