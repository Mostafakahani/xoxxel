import React from "react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper";
import { Swiper } from "swiper/react";

export default function Slider({
  children,
  customBreakpoints = false,
  navigation = true,
  pagination = true,
  spaceBetween = 70,
  customPagination = null,
  loop = false,
}) {
  return (
    <Swiper
      modules={[Navigation, A11y, Pagination, Autoplay]}
      pagination={
        customPagination !== null ? customPagination : { clickable: pagination }
      }
      slidesPerView={"auto"}
      spaceBetween={30}
      centeredSlidesDesk={true}
      navigation={navigation}
      slidesPerGroup={1}
      loop={loop}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={
        customBreakpoints
          ? customBreakpoints
          : {
              1: {
                slidesPerView: 1,
                spaceBetween: spaceBetween,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: spaceBetween,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: spaceBetween,
              },
              850: {
                slidesPerView: 3,
                spaceBetween: spaceBetween,
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: spaceBetween,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: spaceBetween,
              },
            }
      }
    >
      {children}
    </Swiper>
  );
}
