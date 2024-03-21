import React, { useState, useEffect } from 'react'
import { useRegisterMutation } from './../../../app/api/userApiSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const navigate = useNavigate();
	
	const [
		fetchRegister,
		{
			isLoading: isRegisterLoading,
			isSuccess: isRegisterSuccess,
			isError: isRegisterError
		}
	] = useRegisterMutation();

	const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				email, name, phoneNumber
			}

			const result = await fetchRegister(body).unwrap();
			setTimeout(() => {
				navigate('/password');
			}, 1000)
		} catch (e: any) {
			console.error(e);
		}
	}

	return (
		<div>
			<form className="p-5 bg-slate-300" onSubmit={handleRegister}>
				<label htmlFor="email">E-mail</label>
				<input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor="name">Ime</label>
				<input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
				<label htmlFor="phoneNumber">Telefon</label>
				<input id="phoneNumber" type="phone" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
				<button>Unesi</button>
			</form>
		</div>
	)
}

export default Register