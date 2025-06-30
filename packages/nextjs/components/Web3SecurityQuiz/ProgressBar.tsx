import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percent = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full bg-base-200 rounded h-4 mt-4 mb-2 dark:bg-base-300">
      <div
        className="h-4 rounded transition-all duration-300"
        style={{
          width: `${percent}%`,
          background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
