import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-medium text-zinc-300">{label}</label>

      <input
        {...props}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white transition focus:ring-2 focus:ring-white focus:outline-none"
      />
    </div>
  );
};

export default Input;
