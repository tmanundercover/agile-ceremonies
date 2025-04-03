import React from "react";
import { DevelopersList, DeveloperCard } from "./styles";
import { developers } from "./mockData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DeveloperCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '0px'
  };


  return (
    <div style={{ padding: "0 10px" }}>
      <Slider {...settings}>
        {developers.map(developer => {
          const avatarUrl = developer.avatar.includes("://") ? developer.avatar : `https://${developer.avatar}`;
          return (
            <DeveloperCard key={developer.id}>
              <img src={avatarUrl} alt={developer.name} style={{ borderRadius: '50%' }} />
              <div>{developer.name}</div>
              <div>{developer.status}</div>
            </DeveloperCard>
          );
        })}
      </Slider>
    </div>
  );
};

export default DeveloperCarousel;

