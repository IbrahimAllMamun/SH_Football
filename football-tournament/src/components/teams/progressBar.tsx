interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  // Ensure the progress stays within 0 to 1000
  const clampedProgress = Math.min(Math.max(progress, 0), 1000);

  // Calculate the percentage to display the progress bar width
  const percentage = (clampedProgress / 1000) * 100;

  // Determine color based on remaining balance
  const getProgressColor = () => {
    if (percentage > 60) return 'from-green-500 to-green-600';
    if (percentage > 30) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="relative w-full">
      {/* Progress Track */}
      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-4 border border-white/30 shadow-inner">
        <div
          className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer rounded-full"></div>
          
          {/* Progress indicator */}
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
        </div>
      </div>
      
      {/* Progress Label */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-white/60 font-medium">Budget</span>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${clampedProgress}</div>
          <div className="text-xs text-white/60">of $1000</div>
        </div>
      </div>
      
      {/* Progress percentage indicator */}
      <div className="mt-2">
        <div className="flex justify-between text-xs text-white/50">
          <span>$0</span>
          <span className="font-medium">{percentage.toFixed(1)}% remaining</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;