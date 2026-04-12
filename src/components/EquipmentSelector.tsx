import { useState } from 'react';

const equipmentList = [
  { key: 'none', label: 'None (Shadow Training Only)' },
  { key: 'jumpRope', label: 'Jump Rope' },
  { key: 'heavyBag', label: 'Heavy Bag' },
  { key: 'focusMitt', label: 'Focus Mitts' },
  { key: 'woodenDummy', label: 'Wooden Dummy' },
  { key: 'barbell', label: 'Barbell/Weights' },
  { key: 'medicineBall', label: 'Medicine Ball' },
  { key: 'gripTrainer', label: 'Grip Trainer' },
  { key: 'stretchBands', label: 'Stretch Bands' },
  { key: 'pullupBar', label: 'Pull-up Bar' },
  { key: 'speedBag', label: 'Speed Bag' },
  { key: 'kettlebell', label: 'Kettlebell' },
  { key: 'abWheel', label: 'Ab Wheel' }
];

interface EquipmentSelectorProps {
  onChange: (value: string[]) => void;
  value: string[];
}

export default function EquipmentSelector({ onChange, value }: EquipmentSelectorProps) {
  return (
    <section className="martial-card equipment-selector">
      <h3>Training Equipment</h3>
      <p>Select what you have available. Sifu will adapt your plan.</p>
      <div className="equipment-list">
        {equipmentList.map((item) => (
          <label key={item.key} className="equipment-option">
            <input
              type="checkbox"
              checked={value.includes(item.key)}
              onChange={() => {
                if (value.includes(item.key)) {
                  onChange(value.filter((k: string) => k !== item.key));
                } else {
                  onChange([...value, item.key]);
                }
              }}
            />
            {item.label}
          </label>
        ))}
      </div>
    </section>
  );
}
