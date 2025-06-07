import CourseDetail from "../components/CourseDetail";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
// const course = {
//     title: "AWS for Beginners",
//     banner: "https://source.unsplash.com/800x400/?cloud",
//     progress: 30,
//     description: "Learn the basics of AWS and cloud computing.",
//     modules: [
//         {
//             title: "Introduction to AWS",
//             video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             questions: [
//                 { question: "What is AWS?", answer: "AWS stands for Amazon Web Services..." },
//                 { question: "Why use cloud computing?", answer: "Scalability, cost-effectiveness..." },
//             ],
//         },
//         {
//             title: "AWS Core Services",
//             video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//             questions: [{ question: "What is EC2?", answer: "EC2 is a virtual server in the cloud." }],
//         },
//     ],
// };


const ContentPage = () => {
    const [course, setCourse] = useState(null);
    const courseId = window.location.pathname.split('/').pop(); 
    console.log(courseId);
    useEffect(() => {
        const fetchModules = async () => {
            try{
                const response = await axiosInstance.get(`/course/${courseId}`);
                setCourse(response.data);
                console.log("Information that is received is: ", response.data);
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };
        fetchModules();
    }, [courseId]);

    return (
        <div className="container mx-auto px-4 py-8">
            {course ? (
            <CourseDetail course={course} />
            ) : (
            <p>Loading course data...</p>
            )}
        </div>
    ) 
}

export default ContentPage;