import { useState } from 'react';

const QAItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="collapse collapse-plus bg-base-100 rounded-md">
            <input 
            type="checkbox"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)} 
            />
            <div className="collapse-title text-md font-semibold">{question}</div>
            <div className="collapse-content">
                <p>
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default QAItem;