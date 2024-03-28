import React, { useRef, useState, useEffect } from 'react';
import { CircleX } from 'lucide-react';
import clsx from 'clsx';

const CodeInput = ({ reset = undefined, codeFunc, className = '', insertCode = '' }) => {
	const [code, setCode] = useState('');

	// Refs to control each digit input element
	const inputRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	// Reset all inputs and clear state
	const resetCode = () => {
		inputRefs.forEach(ref => {
			ref.current.value = '';
		});
		inputRefs[0].current.focus();
		setCode('');
	}

	// Listen for external reset toggle
	useEffect(() => {
		resetCode();
	}, [reset]); //eslint-disable-line

	useEffect(() => {
		codeFunc(code);
	}, [ code ]);

	useEffect(() => {
		if(insertCode.length === 8) {
			let newCode = ''
			insertCode.toUpperCase().split('').forEach((char, index) => {
				inputRefs[index].current.value = char;
			});
			setCode(insertCode);
		}
	}, []);

	// Handle input
	function handleInput(e, index) {
		const input = e.target;
		const previousInput = inputRefs[index - 1];
		const nextInput = inputRefs[index + 1];

		// Update code state with single digit
		const newCode = [...code];
		// Convert lowercase letters to uppercase
		if (/^[a-z]+$/.test(input.value)) {
			const uc = input.value.toUpperCase();
			newCode[index] = uc;
			inputRefs[index].current.value = uc;
		} else {
			newCode[index] = input.value;
		}
		setCode(newCode.join(''));
		
		input.select();

		if (input.value === '') {
			// If the value is deleted, select previous input, if exists
			if (previousInput) {
				previousInput.current.focus();
			}
		} else if (nextInput) {
			// Select next input on entry, if exists
			nextInput.current.select();
		}
	}

	// Select the contents on focus
	function handleFocus(e) {
		e.target.select();
	}

	// Handle backspace key
	function handleKeyDown(e, index) {
		const input = e.target;
		const previousInput = inputRefs[index - 1];
		const nextInput = inputRefs[index + 1];

		if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
			e.preventDefault();
			setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
			if (previousInput) {
				previousInput.current.focus();
			}
		} else if (e.keyCode === 37) {
			e.preventDefault();
			if(previousInput) {
				previousInput.current.focus();
			}
		} else if (e.keyCode === 39) {
			e.preventDefault();
			if(nextInput) {
				nextInput.current.focus();
			}
		}
	}

	// Capture pasted characters
	const handlePaste = (e) => {
		const pastedCode = e.clipboardData.getData('text');
		if (pastedCode.length === 8) {
			setCode(pastedCode);
			inputRefs.forEach((inputRef, index) => {
				inputRef.current.value = pastedCode.charAt(index);
			});
		}
	};

	// Clear button deletes all inputs and selects the first input for entry
	const ClearButton = () => {
		return (
			<button
				onClick={resetCode}
				className="text-2xl absolute right-[-30px] top-3"
			>
				<CircleX />
			</button>
		)
	}

	return (
		<div className={clsx("flex justify-center w-full items-center", className)}>
			<div className="flex items-center gap-2 relative">
				{[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
					<input
						className="text-2xl bg-gray-800 w-10 flex p-2 text-center rounded-sm font-bold"
						key={index}
						type="text"
						maxLength={1}
						onChange={(e) => handleInput(e, index)}
						ref={inputRefs[index]}
						autoFocus={index === 0}
						onFocus={handleFocus}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={handlePaste}
					/>
				))}
				{
					code.length ?
						<div className="flex items-center">
							<ClearButton className="mb-2" />
						</div>
						:
						null
				}
			</div>
		</div>
	);
}

export default CodeInput;