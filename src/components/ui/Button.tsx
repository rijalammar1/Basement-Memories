import React from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  title?: string;

  children?: React.ReactNode;

  type?: 'button' | 'submit';

  loading?: boolean;

  onClick?: () => void;

  disabled?: boolean;

  className?: string;
}

export default function Button({
  title,
  children,
  type = 'button',
  loading,
  onClick,
  disabled,

  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`flex items-center justify-center rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50 ${className} `}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : children ? (
        children
      ) : (
        title
      )}
    </button>
  );
}
