import React from 'react';
import { CircleX } from 'lucide-react';

interface InputFieldProps {
    type: string;
    id: string;
    name: string;
    inputVal?: string;
    setVal?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    button?: boolean
    buttonAction?: (e: any) => void;
    min?: number;
    max?: number
}

const InputField: React.FC<InputFieldProps> = ({ id, inputVal, setVal, name, type, disabled = false, button = false, buttonAction = undefined, min, max }) => {
    return (
        <div className='form-control'>
            <label htmlFor={id} className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
                {
                    type !== 'number' ?
                        <input
                            type={type} id={id}  placeholder={name} value={inputVal} onChange={setVal} disabled={disabled} autoComplete='off' required
                            className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                        :
                        <input
                            type={type} id={id}  placeholder={name} value={inputVal} onChange={setVal} disabled={disabled} autoComplete='off' required min={min} max={max}
                            className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />
                }
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    {name}
                </span>
                {
                    button && 
                            <>  
                                <button type="button" className='absolute right-5' onClick={buttonAction}>
                                    <CircleX />
                                </button>
                            </>
                }
            </label>
        </div>
    );
};

export default InputField;
