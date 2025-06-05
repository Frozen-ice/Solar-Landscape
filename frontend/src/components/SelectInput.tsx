import React from 'react';

interface SelectInputProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  error?: string;
  helper?: string;
  register: any;
  disabled?: boolean;
  [key: string]: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  options,
  error,
  helper,
  register,
  disabled,
  ...rest
}) => (
  <div className="mb-2">
    <label htmlFor={id} className="block font-semibold text-gray-700 mb-1">{label}</label>
    <select
      id={id}
      className={`block w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150 ${error ? 'border-red-400 ring-red-200' : ''}`}
      aria-invalid={!!error}
      aria-describedby={`${id}-helper ${id}-error`}
      disabled={disabled}
      {...register}
      {...rest}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {helper && <span id={`${id}-helper`} className="text-gray-400 text-xs mt-1 block">{helper}</span>}
    {error && <span id={`${id}-error`} className="text-red-500 text-sm mt-1 block">{error}</span>}
  </div>
);

export default SelectInput; 