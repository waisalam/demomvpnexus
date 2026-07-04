import React from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}

const Checklist: React.FC<ChecklistProps> = ({ items, onToggle }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onToggle(item.id)}
          />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
export type { ChecklistItem };