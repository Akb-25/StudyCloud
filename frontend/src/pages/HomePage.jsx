import ImageCard from "../components/ImageCard"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
const HomePage = () => {
  const navigate = useNavigate();
  const [serviceCards, setServiceCards] = useState([]);
  useEffect(() => {
    const fetchServiceCards = async () => {
      try {      
        const response = await axiosInstance.get('/course/'); 
        setServiceCards(response.data);
      } catch (error) {
        console.error('Error fetching service cards:', error);
      }
    };
    fetchServiceCards();
    }, []
  );

  return (
    <div className="min-h-screen bg-base-200 pt-16 py-8">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Continue Your Courses</h1>
        {/* <p className="text-lg mb-8">Explore our cloud computing courses and resources.</p> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 ">
        {serviceCards.map((card, index) => (
          <ImageCard
            key={index}
            id={card.id}
            image={card.thumbnail_url}
            title={card.title}
            description={card.description}
            onClick={() => navigate(`/course/${card.id}`)}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore All Courses</h1>
        {/* <p className="text-lg mb-8">Explore our cloud computing courses and resources.</p> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 ">
        {serviceCards.map((card, index) => (
          <ImageCard
            key={index}
            id={card.id}
            image={card.thumbnail_url}
            title={card.title}
            description={card.description}
            onClick={() => navigate(`/course/${card.id}`)}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Take a Practice Test</h1>
        {/* <p className="text-lg mb-8">Explore our cloud computing courses and resources.</p> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 ">
        {serviceCards.map((card, index) => (
          <ImageCard
            key={index}
            id={card.id}
            image={card.thumbnail_url}
            title={card.title}
            description={card.description}
            onClick={() => navigate(`/course/${card.id}`)}
          />
        ))}
      </div>
      </div>
  )
}

export default HomePage;