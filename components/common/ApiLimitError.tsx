import React from "react";

interface ApiLimitErrorProps {
  onRetry?: () => void;
  retryAfter?: number; // seconds
}

const ApiLimitError: React.FC<ApiLimitErrorProps> = ({
  onRetry,
  retryAfter,
}) => {
  const [countdown, setCountdown] = React.useState(retryAfter || 60);

  React.useEffect(() => {
    if (!retryAfter) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter]);

  return (
    <div
      className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mobile-shadow text-center"
      data-oid="vf_umn7"
    >
      <div className="text-4xl mb-3" data-oid="n0z012r">
        ⏳
      </div>
      <h3
        className="text-lg font-semibold text-yellow-700 mb-2"
        data-oid="a38xpxb"
      >
        API利用制限
      </h3>
      <p
        className="text-yellow-600 text-sm mb-4 leading-relaxed"
        data-oid="zphi._e"
      >
        現在、多くのリクエストが集中しているため、
        <br data-oid="v:drsn." />
        しばらく時間をおいてから再度お試しください。
      </p>
      {countdown > 0 && (
        <p
          className="text-yellow-700 font-mono text-lg mb-4"
          data-oid="b.8ilpl"
        >
          {Math.floor(countdown / 60)}:
          {(countdown % 60).toString().padStart(2, "0")}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={countdown > 0}
          className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white font-semibold py-2 px-4 rounded-lg mobile-transition touch-target disabled:opacity-50 disabled:cursor-not-allowed"
          data-oid="w2fv6p9"
        >
          {countdown > 0 ? `${countdown}秒後に再試行可能` : "再試行"}
        </button>
      )}
    </div>
  );
};

export default ApiLimitError;
