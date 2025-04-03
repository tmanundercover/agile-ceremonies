import React from 'react';
import { developers } from './mockData';

const DeveloperCarousel: React.FC = () => {
  return (
    <div>
      <h3>Developers</h3>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', padding: '0.5rem 0' }}>
        {developers.map((dev) => (
          <div key={dev.id} style={{ flex: '0 0 auto', border: '1px solid #ccc', borderRadius: '4px', padding: '0.5rem', minWidth: '80px', textAlign: 'center' }}>
            <img src={dev.avatar} alt={dev.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div>{dev.name}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>{dev.skills.join(", ")}</div>
            <div style={{ fontSize: '0.8em', color: dev.status === "available" ? 'green' : 'red' }}>{dev.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperCarousel;
