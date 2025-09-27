'use client'

const LessonInfo = ({ categoryName, lessonId }) => {
  return (
    <div className="mt-6 text-center text-gray-600 px-4">
      <p className="text-base md:text-lg font-medium">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Lesson {lessonId}
      </p>
    </div>
  );
};

export default LessonInfo;