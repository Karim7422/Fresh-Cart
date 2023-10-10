import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Electronics_img from "../../../Assets/images/Categories Slider/Electronics.png";
import Mobiles_img from "../../../Assets/images/Categories Slider/Mobiles.jpg";
import Men_img from "../../../Assets/images/Categories Slider/Men.jpg";
import Women_img from "../../../Assets/images/Categories Slider/women.jpg";
import Home_img from "../../../Assets/images/Categories Slider/Home.png";
import Beauty_img from "../../../Assets/images/Categories Slider/Health-And-Beauty.jpg";
import Baby_img from "../../../Assets/images/Categories Slider/baby and toys.jpg"; 

export default function CategorySlider() {
    const [slides , setSlides]=useState(4)

    useEffect(()=>{
       if(window.innerWidth > 992){
        setSlides(4)
       }else if(window.innerWidth > 768 &&window.innerWidth < 992){
        setSlides(3)
       }else if(window.innerWidth <= 768 && window.innerWidth > 425){
        setSlides(2)
       }else{
        setSlides(1)
       }
    },[])
    return (
        <>
            <h2 className="fw-bolder">Shop Popular Categories</h2>
            <Swiper
                spaceBetween={30}
                centeredSlides={false}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
                slidesPerView={slides}
            >
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Electronics_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Electronics</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Mobiles_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Mobiles</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Men_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Men</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Women_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Women</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Home_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Home</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Beauty_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Beauty & Health</h5>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className="w-100" src={Baby_img} alt="Category-img" />
                    </div>
                    <h5 className="fw-bold">Baby & Toys</h5>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
