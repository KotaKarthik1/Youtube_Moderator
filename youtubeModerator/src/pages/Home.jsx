import React, { useEffect, useState } from "react";
import landing from "../assets/images/video_editing_1.jpg";
import logo from "../assets/images/logo.png";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Reviews from "../Components/Reviews";
import TopRatedCarousel from "../Components/TopRatedCarousel";
import Header from "../Components/Header";
import Features from "../Components/Features";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <Header isScrolled={isScrolled} />
        <section
          className="box relative flex flex-col items-center justify-center min-h-screen text-white text-center px-10 py-28"
          style={{
            backgroundImage: `url(${landing})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4 text-shadow">
            Youtube Moderator
          </h1>
          <h3 className="text-xl md:text-2xl mb-8">
            Connect, Collaborate and create videos.
          </h3>

          <a
            href="#"
            className="boxBtn bg-transparent border-4 border-white rounded-full px-6 py-3 uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Contact Us
          </a>
        </section>
      </div>

      {/* <TopRatedCarousel /> */}

      <Features />
      {/* <Reviews /> */}
      <Footer />

      {/* <Contact/> */}
    </>
  );
};

export default Home;
