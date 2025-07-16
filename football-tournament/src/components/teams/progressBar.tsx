interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  // Ensure the progress stays within 0 to 1000
  const clampedProgress = Math.min(Math.max(progress, 0), 1000);

  // Calculate the percentage to display the progress bar width
  const percentage = (clampedProgress / 1000) * 100;

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-3 mt-4">
      <div
        className="flex justify-end items-center bg-green-600 h-3 border-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      >
        <div className="bg-blue-600 h-6 w-[6px] rounded-full transition-all duration-300 ease-in-out"></div>
      </div>
      {/* Current progress value */}
      <div
        className="absolute text-2xl text-gray-700 bottom-4 font-bold transform -translate-y-6"
        style={{ left: `${percentage}%`, transform: `translateX(-50%)` }}
      >
        {`$${clampedProgress}`}
      </div>
    </div>
  );
};

export default ProgressBar;