import React from 'react';
import { developers } from "./mockData";
import { DeveloperCard, DevelopersList } from "./styles";

const DeveloperCarousel: React.FC = () => {
  return (
    <DevelopersList>
      {developers.map(developer => {
        // Ensure the URL contains a protocol.
        const avatarUrl = developer.avatar.includes("://") ? developer.avatar : `https://${developer.avatar}`;
        return (
          <DeveloperCard key={developer.id}>
            <img src={avatarUrl} alt={developer.name} style={{ borderRadius: '50%' }} />
            <div>{developer.name}</div>
            <div>{developer.status}</div>
          </DeveloperCard>
        );
      })}
    </DevelopersList>
  );
};

export default DeveloperCarousel;
