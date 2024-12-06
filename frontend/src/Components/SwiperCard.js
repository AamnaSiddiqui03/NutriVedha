import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import CardDisplay from "./CardDisplay";


function SwiperCard(props) {
  

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax]}
        spaceBetween={30}
        slidesPerView={3}
        parallax={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
      >
        {props.recommend.map((item, index) => (
          <SwiperSlide key={index}>
            <CardDisplay {...item} />
            
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperCard;
