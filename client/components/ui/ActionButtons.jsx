'use client'

const ActionButtons = ({ onSkip, onSubmit, userAnswer, isSubmitting = false }) => {
  return (
    <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-200">
      <button
        onClick={onSkip}
        className="text-gray-600 font-semibold hover:text-gray-800 transition-colors text-sm md:text-base px-3 py-2 rounded-full hover:bg-gray-50"
      >
        Skip
      </button>
      <button
        onClick={onSubmit}
        disabled={!userAnswer.trim() || isSubmitting}
        className="px-5 md:px-6 py-2.5 md:py-3 text-white rounded-full font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default ActionButtons;