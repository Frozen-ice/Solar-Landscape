import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  register: any;
  autoFocus?: boolean;
  [key: string]: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  helper,
  register,
  autoFocus,
  ...rest
}) => (
  <div className="mb-2">
    <label htmlFor={id} className="block font-semibold text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`block w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150 placeholder-gray-400 ${error ? 'border-red-400 ring-red-200' : ''}`}
      aria-invalid={!!error}
      aria-describedby={`${id}-helper ${id}-error`}
      autoFocus={autoFocus}
      {...register}
      {...rest}
    />
    {helper && <span id={`${id}-helper`} className="text-gray-400 text-xs mt-1 block">{helper}</span>}
    {error && <span id={`${id}-error`} className="text-red-500 text-sm mt-1 block">{error}</span>}
  </div>
);

export default TextInput; 