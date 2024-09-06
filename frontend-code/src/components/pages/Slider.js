// src/components/Slider.js
import React, { useEffect, useState } from "react";
import "../css/Slider.css";
import { useNavigate } from "react-router-dom";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 saniyede bir kaydırma yapar

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      ></link>

      <div className="slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={index === currentIndex ? "active" : "inactive"}
          />
        ))}
      </div>
      <div className="text-overlay">
        <p>
          Home design is an art that makes your living spaces perfect not only
          in terms of aesthetics but also functionality. A home is more than
          just four walls; it is a living space that reflects your soul..
        </p>
        <p>
          <button
            className="btn-primary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Purchose Now.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Slider;
