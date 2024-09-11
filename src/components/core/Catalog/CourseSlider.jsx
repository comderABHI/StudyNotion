import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Course_Card from './Course_Card';

const CourseSlider = ({ Courses }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      pagination={{ clickable: true }}
      navigation
      modules={[Navigation, Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      className="mySwiper"
    >
      {Courses?.length ? (
        Courses.map((course, index) => (
          <SwiperSlide key={index}>
            <Course_Card course={course} />
          </SwiperSlide>
        ))
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </Swiper>
  );
};

export default CourseSlider;
