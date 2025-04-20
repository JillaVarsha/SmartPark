import React from 'react';

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-10">
      <div className="absolute inset-0 pattern-grid">
        {/* Parking Lines Pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="parking-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Parking Space Lines */}
              <path d="M 0,50 L 100,50" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M 0,0 L 0,100" stroke="currentColor" strokeWidth="2" fill="none"/>
              
              {/* Car Icon */}
              <path d="M30,45 L70,45 L75,55 L25,55 Z M35,55 L35,60 M65,55 L65,60" 
                    stroke="currentColor" fill="none" strokeWidth="1.5"/>
              
              {/* P Symbol */}
              <path d="M45,30 L45,40 M45,30 Q50,30 50,35 Q50,40 45,40" 
                    stroke="currentColor" fill="none" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#parking-pattern)"/>
        </svg>
      </div>
    </div>
  );
}; 