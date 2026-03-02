import React from "react";
import { ImageCard } from "./ImageCard";

// Use absolute paths for public directory images in Vite
const hack1 = "/img/hack1.png";
const hack2 = "/img/hack2.png";
const hack3 = "/img/hack3.png";
const hack4 = "/img/hack4.png";
const hack5 = "/img/hack5.png";
const hack6 = "/img/hack6.png";
const hack7 = "/img/hack7.png";

export const images = [
  <ImageCard
    key="image-1"
    image={hack1}
  />,
  <ImageCard
    key="image-2"
    image={hack2}
  />,
  <ImageCard
    key="image-3"
    image={hack3}
  />,
  <ImageCard
    key="image-4"
    image={hack4}
  />,
  <ImageCard
    key="image-5"
    image={hack5}
  />,
  <ImageCard
    key="image-6"
    image={hack6}
  />,
  <ImageCard
    key="image-7"
    image={hack7}
  />,
];

export default images;