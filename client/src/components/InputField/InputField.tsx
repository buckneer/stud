import React from 'react';

interface InputFieldProps {
    id: string;
    inputVal: string;
    setVal: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, inputVal, setVal, name, type }) => {
    return (
        <label htmlFor={id} className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
            <input
                type={type} id={id} placeholder={name} value={inputVal} onChange={setVal} autoComplete='off' required
                className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                {name}
            </span>
        </label>
    );
};

export default InputField;
