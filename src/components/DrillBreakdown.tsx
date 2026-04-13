import React from 'react';
import './DrillBreakdown.css';

interface DrillBreakdownProps {
  name: string;
  breakdown: string[];
  source: string;
  onClose: () => void;
}

const DrillBreakdown: React.FC<DrillBreakdownProps> = ({ name, breakdown, source, onClose }) => {
  return (
    <div className="drill-breakdown-modal">
      <div className="drill-breakdown-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{name}</h2>
        <ol className="breakdown-list">
          {breakdown.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
        <div className="drill-source">Source: {source}</div>
      </div>
    </div>
  );
};

export default DrillBreakdown;
