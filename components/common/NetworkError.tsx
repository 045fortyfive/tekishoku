import React from "react";

interface NetworkErrorProps {
  onRetry?: () => void;
  message?: string;
  showRetry?: boolean;
}

const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  message = "ネットワークエラーが発生しました",
  showRetry = true,
}) => {
  return (
    <div
      className="bg-red-50 border border-red-200 rounded-lg p-4 mobile-shadow text-center"
      data-oid="echb4h8"
    >
      <div className="text-4xl mb-3" data-oid="9f65wyh">
        📡
      </div>
      <h3
        className="text-lg font-semibold text-red-700 mb-2"
        data-oid="e3upyfh"
      >
        接続エラー
      </h3>
      <p
        className="text-red-600 text-sm mb-4 leading-relaxed"
        data-oid="9ezl740"
      >
        {message}
        <br data-oid="t:8skm9" />
        インターネット接続を確認してください。
      </p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg mobile-transition touch-target"
          data-oid="w6qhqz_"
        >
          再試行
        </button>
      )}
    </div>
  );
};

export default NetworkError;
