import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ghoul from "../../assets/images/ghool.jpg";
import youseef from "../../assets/images/youseef.jpg";
import maram from "../../assets/images/maram.jpg";
import maryam from "../../assets/images/maryam.jpg";
import warda from "../../assets/images/warda.jpg";
import yasmin from "../../assets/images/yasmin.jpg";
const TeamSlider = () => {
  // Team data array
  const teamMembers = [
    {
      id: 1,
      image: ghoul,
      position: "AI Developer",
      name: "Yousef El-Ghoul",
    },
    {
      id: 2,
      image: youseef,
      position: "Backend Developer",
      name: "Yousef Tarek",
    },
    {
      id: 3,
      image: maryam,
      position: "Frontend Developer",
      name: "Maryam Ahmed",
    },
    {
      id: 4,
      image: maram,
      position: "AI Developer",
      name: "Maram Essam",
    },
    {
      id: 5,
      image: warda,
      position: "Backend Developer",
      name: "Warda Khaled",
    },
    {
      id: 6,
      image: yasmin,
      position: "AI Developer",
      name: "Yassmin Khafaga",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-white dark:bg-skin-dark">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-playfair">
          Our team
        </h2>

        <div className="relative px-8 ">
          {" "}
          {/* Increased side padding for arrow spacing */}
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".team-swiper-next",
              prevEl: ".team-swiper-prev",
            }}
            loop={true}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="bg-skin-pink-light/50 dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full flex flex-col border border-gray-100 dark:border-gray-700">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.position}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                      {member.position}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {member.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom navigation arrows - Simple and small */}
          <button
            className="team-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-primary dark:hover:text-white transition-colors bg-transparent p-1"
            aria-label="السابق"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="team-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-primary dark:hover:text-white transition-colors bg-transparent p-1"
            aria-label="التالي"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
