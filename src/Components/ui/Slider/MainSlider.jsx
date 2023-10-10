import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from "../../../Assets/images/slider-image-3.jpeg";
import slide2 from "../../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../../Assets/images/slider-image-1.jpeg";

export default function MainSlider() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={false}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={slide1} alt="slide-img1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide2} alt="slide-img2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide3} alt="slide-img3" />
      </SwiperSlide>
    </Swiper>
  );
}
