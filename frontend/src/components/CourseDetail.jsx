import Module from "./Module";
import { useState } from "react";

const CourseDetail = ({ course }) => {
  const [completedModules, setCompletedModules] = useState([]);
  console.log("Contents of the course are: ", course);
  const handleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const progress = Math.round((completedModules.length / course.modules.length) * 100);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      {/* <img
        src={course.banner}
        alt="Course Banner"
        className="w-full h-64 object-cover rounded-lg mb-4"
      /> */}

      <progress
        className="progress progress-primary w-full mb-4"
        value={progress}
        max="100"
      ></progress>
      <p className="mb-2 text-sm text-gray-600">Progress: {progress}%</p>

      <p className="mb-6 text-gray-700">{course.description}</p>

      <div className="space-y-4">
        {course.modules.map((module, i) => (
          <Module
            key={i}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;