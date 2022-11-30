// Let's make <Card text='Write the docs' /> draggable!

import React from "react";
import styles from "./style.module.scss";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types/swiper-options";
import "swiper/swiper.min.css";

SwiperCore.use([Autoplay]);

/**
 * Your Component
 */
export default function Card({ isDragging, text }) {
  // return <div>3333</div>;
  return (
    <div className={styles.box}>
      <Swiper>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper>
    </div>
  );
}
