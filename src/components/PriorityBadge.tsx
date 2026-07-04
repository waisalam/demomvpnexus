import React from 'react';

export type Priority = 'low' | 'medium' | 'high';

export interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const badgeBaseStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: '1.5',
  textTransform: 'capitalize',
};

const priorityStyles: Record<Priority, React.CSSProperties> = {
  low: {
    backgroundColor: '#c8e6c9',
    color: '#2e7d32',
  },
  medium: {
    backgroundColor: '#ffe0b2',
    color: '#e65100',
  },
  high: {
    backgroundColor: '#ffcdd2',
    color: '#c62828',
  },
};

export default function PriorityBadge({
  priority,
  className,
}: PriorityBadgeProps): JSX.Element {
  const combinedStyle: React.CSSProperties = {
    ...badgeBaseStyle,
    ...priorityStyles[priority],
  };

  return (
    <span className={className} style={combinedStyle}>
      {priority}
    </span>
  );
}