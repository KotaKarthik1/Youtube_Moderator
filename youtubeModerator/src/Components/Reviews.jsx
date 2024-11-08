import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const TestimonialSlide = ({ rating, title, content, author }) => (
  <div className="keen-slider__slide number-slide ">
    <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
      <div>
        <div className="flex gap-0.5 text-green-500">
          {Array.from({ length: rating }).map((_, index) => (
            <svg
              key={index}
              className="size-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
            {title}
          </p>
          <p className="mt-4 leading-relaxed text-gray-700">{content}</p>
        </div>
      </div>
      <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
        &mdash; {author}
      </footer>
    </blockquote>
  </div>
);

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  const testimonials = [
    {
      rating: 5,
      title: "Outstanding Experience!",
      content:
        "This company exceeded my expectations. I couldn't be happier with the service!",
      author: "Aditi Sharma",
    },
    {
      rating: 4,
      title: "Very Good Service!",
      content:
        "The service was reliable and the team was very supportive throughout.",
      author: "Rahul Verma",
    },
    {
      rating: 3,
      title: "Satisfactory!",
      content: "It was a decent experience, but there were some minor issues.",
      author: "Priya Iyer",
    },
    {
      rating: 5,
      title: "Top Notch Support!",
      content:
        "Customer support was very helpful and resolved my issues quickly.",
      author: "Vikram Singh",
    },
    {
      rating: 4,
      title: "Good Value for Money!",
      content:
        "The product quality is great for the price. I am happy with my purchase.",
      author: "Sneha Reddy",
    },
    {
      rating: 2,
      title: "Not What I Expected!",
      content:
        "I faced several problems with the product, and support was slow.",
      author: "Arjun Mehta",
    },
    {
      rating: 5,
      title: "Amazing Quality!",
      content:
        "The quality of the items was beyond my expectations! Will order again.",
      author: "Neha Patel",
    },
    {
      rating: 4,
      title: "Pretty Good Experience!",
      content:
        "Overall, I had a good experience, though there's room for improvement.",
      author: "Karan Kapoor",
    },
    {
      rating: 3,
      title: "Average Service.",
      content:
        "It was an average experience. Nothing too special or disappointing.",
      author: "Meera Joshi",
    },
    {
      rating: 5,
      title: "Exceptional Service!",
      content:
        "The service provided was exceptional, and I highly recommend them!",
      author: "Rahul Desai",
    },
    {
      rating: 4,
      title: "Good, But Could Be Better.",
      content:
        "The experience was generally good, but I had some minor hiccups.",
      author: "Riya Bhatia",
    },
    {
      rating: 3,
      title: "Met My Needs.",
      content:
        "The service met my needs, but I expected a bit more attention to detail.",
      author: "Vivek Nair",
    },
    {
      rating: 5,
      title: "Fantastic Experience!",
      content: "Everything was perfect from start to finish. Highly recommend!",
      author: "Pooja Agarwal",
    },
    {
      rating: 4,
      title: "Solid Choice.",
      content:
        "I made a solid choice with this company. I'm pleased with the results.",
      author: "Anjali Sethi",
    },
    {
      rating: 2,
      title: "Disappointing Experience.",
      content: "I had high hopes but was let down by the product quality.",
      author: "Suresh Gupta",
    },
  ];

  return (
    <section className="bg-gray-50">
      <div className="mx-auto  px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Discover Genuine Reviews from Our Valued Customers
          </h2>

          <div className="mt-8 flex gap-4 lg:mt-0">
            <button
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              aria-label="Next testimonial"
              id="keen-slider-next"
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
          <div ref={sliderRef} className="keen-slider">
            <div id="keen-slider" className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <TestimonialSlide key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
