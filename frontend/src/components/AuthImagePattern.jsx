import React from 'react';
import cloudComputingImage from '../assets/cloudComputing.png';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-base-content/70 mb-6">{subtitle}</p>
        <img
          src={cloudComputingImage}
          alt="Authentication Pattern"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AuthImagePattern;