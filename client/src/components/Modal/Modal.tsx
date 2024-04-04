import { BadgeInfo, CircleAlert, CircleX, LucideUndo2, Trash, Undo2, Undo2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

interface IModal {
	isOpen: boolean,
	id?: string,
	setIsOpen: (isOpen: boolean) => void,
	deleteFunc: (id: string) => void,
	children: JSX.Element | JSX.Element[],
	content?: JSX.Element | JSX.Element[],
	message?: string
}

const Modal: React.FC<IModal> = ({ children, isOpen, id, content, message, setIsOpen, deleteFunc }) => {

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [setIsOpen]);

	return (
		<>
			{isOpen &&
				<div className={`absolute top-0 left-0 w-full h-screen flex justify-center items-center`}>
					<div className='absolute top-0 left-0 w-full h-full bg-transparent z-10' onClick={() => setIsOpen(false)} />
					<div  className='w-1/3 h-auto blur-none bg-slate-900 rounded-md text-white p-8 z-50'>
						{
							content ? 
											<>{content}</> 
											:
											<div className='text-xl font-semibold mb-10 flex justify-center w-full'>
												{message}
											</div>
						}
						{
							!content && !message && 
																	<div className='text-xl font-semibold -mt-10 mb-10 flex gap-2 items-center justify-center text-green-500'>
																			Missing message or content <BadgeInfo className='text-green-500' />
																	</div>
						}
						<div className='w-full flex justify-end gap-4'>
							<button className='bg-white hover:bg-gray-200 transition py-2 px-4 font-semibold rounded-md text-black ring-slate-400 select-none' onClick={() => setIsOpen(false)}>
								<Undo2 />
							</button>
							<button className='bg-red-500 hover:bg-red-700 transition py-2 px-4	 font-semibold rounded-md ring-destructive-foreground select-none' onClick={() => deleteFunc(id!)}>
								<Trash />
							</button>
						</div>
					</div>
				</div>
			}
			<div className={`${isOpen && "blur-sm"} flex w-full h-full`} >
				{children}
			</div>
		</>
	);
}

export default Modal