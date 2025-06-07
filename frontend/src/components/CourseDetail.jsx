import Module from "./Module";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
const CourseDetail = ({ course }) => {
  const [completedModules, setCompletedModules] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const result = await axiosInstance.get(`/progress/${course.id}`);
        console.log("Progress data: ", result.data);
        if (result.data && result.data.completed_modules) {
          setCompletedModules(result.data.completed_modules);
        }
        setProgress(result.data.ratio);
      } catch (error) {
        console.error("Error fetching progress: ", error);
      }
    }
    fetchProgress();
  }, [course.id]);

  console.log("Contents of the course are: ", course);
  const handleComplete = async (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      try{
        const result = await axiosInstance
        .post(`/progress`, {
          course_id: course.id,
          module_id: moduleId,
        });
        setCompletedModules([...completedModules, moduleId]);
      } catch (error) {
        console.error("Error updating progress: ", error);
      }
    }
  };

  // const progress = Math.round((completedModules.length / course.modules.length) * 100);

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