import React from 'react';

type PageButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: 'default' | 'primary';
};

const PageButton = ({ text, onClick, variant = 'default' }: PageButtonProps) => {
  const base = 'px-3 py-1 rounded text-white font-medium';
  const color = variant === 'primary' ? 'bg-gray-500' : 'bg-gray-400';
  return (
    <button type="button" className={`${base} ${color}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default PageButton; 