import { useState } from "react";
import QAItem from "./QAItem";

const Module = ({ module, onComplete, isCompleted }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div className={`collapse collapse-arrow bg-base-200 rounded-lg ${isCompleted ? "border-l-4 border-green-500" : ""}`}>
      <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <span>{module.title}</span>
        {!isCompleted && (
          <button
            onClick={() => onComplete(module.id)}
            className="btn btn-xs btn-success"
          >
            Mark as Completed
          </button>
        )}
        {isCompleted && <span className="text-green-500 text-sm">✔ Completed</span>}
      </div>

      <div className="collapse-content space-y-3">
        <div className="w-full aspect-video rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={module.video_url}
            title={module.title}
            allowFullScreen
          ></iframe>
        </div>

        {module.questions.map((q, i) => (
          <QAItem key={i} question={q.question} answer={q.answer} />
        ))}
      </div>
    </div>
  );
};

export default Module;