import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import TVREPAIR from "../assets/images/tvrepair.jpg";
import DEEPCLEAN from "../assets/images/deepclean.jpg";
import PLUMBING from "../assets/images/plumbing.jpg";
import PESTCONTROL from "../assets/images/pestcontrol.jpg";
import ELECTRICIAN from "../assets/images/electrician.jpg";
import HOMEORGANIZING from "../assets/images/homeorganizing.jpg";
import PAINTING from "../assets/images/painting.jpg";

const services = [
  {
    title: "Professional Appliance Repair Services",
    image: TVREPAIR,
    rating: 4.8,
    description:
      "Our expert technicians specialize in repairing a wide range of household appliances, ensuring quick and effective solutions.",
    link: "#",
  },
  {
    title: "Comprehensive Cleaning",
    image: DEEPCLEAN,
    rating: 4.9,
    description:
      "Our deep cleaning service goes beyond the surface, ensuring every corner of your home or office is meticulously cleaned.",
    link: "#",
  },
  {
    title: "Reliable Plumbing Services",
    image: PLUMBING,
    rating: 4.7,
    description:
      "Our skilled plumbers provide fast, efficient, and affordable solutions for all your plumbing needs.",
    link: "#",
  },
  {
    title: "Pest Control Services",
    image: PESTCONTROL,
    rating: 4.6,
    description:
      "Our pest control experts provide safe, efficient, and eco-friendly solutions to eliminate pests from your home or business, ensuring long-lasting protection against infestations.",
    link: "#",
  },
  {
    title: "Reliable Electrician Services",
    image: ELECTRICIAN,
    rating: 4.8,
    description:
      "Our licensed electricians deliver top-quality electrical services, including installations, repairs, and safety inspections, ensuring your home or business is safe and up to code.",
    link: "#",
  },
  {
    title: "Professional Home Organizing Services",
    image: HOMEORGANIZING,
    rating: 4.9,
    description:
      "Our expert organizers help declutter and organize your space, creating functional and stylish environments that simplify your daily routines and enhance your quality of life.",
    link: "#",
  },
  {
    title: "Expert Painting Services",
    image: PAINTING,
    rating: 3,
    description:
      "Our professional painters provide high-quality painting services, whether you need a fresh new look for your home or a complete makeover for your commercial space.",
    link: "#",
  },
  // Add more services here as needed
];

export default function TopRatedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const currentService = services[currentIndex];

  return (
    <div className="relative p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center font-sans mb-8">
        Top Rated Services
      </h1>

      <div className="w-full max-w-6xl overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 rounded-lg overflow-hidden">
          <img
            src={currentService.image}
            alt={currentService.title}
            className="w-full h-90 md:h-90 object-cover transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="w-full md:w-1/4 p-4 flex flex-col justify-center bg-white md:ml-6">
          <h3 className="text-xl font-semibold mb-2">{currentService.title}</h3>
          <p className="flex items-center mb-4">
            {Array.from({ length: Math.round(currentService.rating) }).map(
              (_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className="text-yellow-400 mr-1"
                />
              )
            )}
          </p>
          <p className="text-center text-sm px-2">
            {currentService.description}
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
