import React, { useState } from 'react';
import { developers } from "./mockData";
import { DeveloperCard } from "./styles";

const DeveloperCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalDevelopers = developers.length;

  const goPrevious = () => {
    setCurrentIndex((currentIndex - 1 + totalDevelopers) % totalDevelopers);
  };

  const goNext = () => {
    setCurrentIndex((currentIndex + 1) % totalDevelopers);
  };

  const developer = developers[currentIndex];

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <button onClick={goPrevious} style={{ marginRight: '10px' }}>{'<'}</button>
      <DeveloperCard>
        <img src={developer.avatar} alt={developer.name} style={{ borderRadius: '50%' }} />
        <div>{developer.name}</div>
        <div>{developer.status}</div>
      </DeveloperCard>
      <button onClick={goNext} style={{ marginLeft: '10px' }}>{'>'}</button>
    </div>
  );
};

export default DeveloperCarousel;
