'use client'

const AnswerInput = ({ userAnswer, setUserAnswer, disabled = false }) => {
  return (
    <textarea
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      className="text-lg md:text-xl font-medium text-gray-800 border-2 outline-none rounded-xl border-gray-300 bg-white w-full py-3 md:py-4 px-3 md:px-4 resize-none min-h-28 md:min-h-32 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
      placeholder="Type your answer here..."
      disabled={disabled}
    />
  );
};

export default AnswerInput;