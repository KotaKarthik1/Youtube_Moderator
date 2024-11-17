import React, { useEffect, useState } from "react";
import landing from "../assets/images/video_editing_1.jpg";
import logo from "../assets/images/logo.png";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Reviews from "../Components/Reviews";
import TopRatedCarousel from "../Components/TopRatedCarousel";
import Header from "../Components/Header";
import Features from "../Components/Features";
import { useNavigate } from "react-router-dom";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const signUpBtn = () => {
    navigate("/signUp");
  };

console.log(currentLoggedInUser);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(()=>
  {
    if(currentLoggedInUser?.role=='editor')
    {
      navigate('/EditorDashboard');
    }
    else if(currentLoggedInUser?.role=='organizer')
    {
      navigate('/OrgDashboard');
    }
  })

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
          <h3 className="text-xl font-bold md:text-2xl mb-8">
            Connect, Collaborate and create videos.
          </h3>

          <a
            href="#"
            className="boxBtn flex bg-slate-50 text-black hover:bg-transparent border-4 border-white rounded-full px-6 py-3 hover:text-white transition-all duration-500 group"
            onClick={signUpBtn}
          >
            Let's get started
            <span className="flex arrowmark">
              <span className="w-2 h-2 mt-2 ml-1 border-t-2 border-e-2 border-black rotate-45 group-hover:border-white animate-arrowBounceRight delay-0"></span>
            </span>
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
