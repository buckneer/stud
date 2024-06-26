import React, { useState, useEffect } from 'react'
import { useRegisterMutation } from './../../../app/api/userApiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MutationState from '../../../components/MutationState/MutationState';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const navigate = useNavigate();
	const roles = ['Student', 'Profesor', 'Stud služba'];
	const engRoles = ['student', 'professor', 'service'];
	const [selectedRole, setSelectedRole] = useState(0);

	const { uni } = useParams();

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
				email, name, phoneNumber, roles: [engRoles[selectedRole]]
			}

			const result = await fetchRegister(body).unwrap();

			setTimeout(() => {
				// TODO check if role is student
				// Temporary var!!
				let whatToAdd = engRoles[selectedRole];

				navigate(`/uni/${uni}/${whatToAdd}/add`, {
					state: {
						user: result,
						for: whatToAdd
					}
				});
			}, 1000)
		} catch (e: any) {
			console.error(e);
		}
	}

	const handleRole = (currRole: number) => {
		setSelectedRole(currRole);
	}


	return (
		<div className='flex justify-center items-center'>
			<Helmet>
				<title>Registracija | Stud</title>
			</Helmet>
			<div className='card'>
				<form className='' onSubmit={handleRegister}>
					<div className='form-header flex justify-center flex-col items-center'>
						<div className="text-3xl font-semibold p-2 uppercase text-black">Registracija</div>
						<div className="text-gray-400 p-2" >Registracija novog korisnika</div>

						<div id="FormHeader" className="w-full text-slate-100">
							<MutationState
								isLoading={isRegisterLoading}
								isSuccess={isRegisterLoading}
								successMessage='Uspešna registracija korisnika!'
								isError={isRegisterError}
								errorMessage='Greška prilikom registracije!'
							/>
						</div>
					</div>
					<div className='FormItem w-full flex flex-col justify-start p-2 items-start relative'>
						<label htmlFor="UserEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="email" id="UserEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								E-adresa
							</span>
						</label>
					</div>
					<div className='FormItem w-full flex flex-col justify-start p-2 items-start relative'>
						<label htmlFor="name" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="text" id="name" placeholder="Ime" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								Ime
							</span>
						</label>
					</div>
					<div className='FormItem w-full flex flex-col justify-start p-2 items-start relative'>
						<label htmlFor="phone" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
							<input
								type="text" id="phone" placeholder="Broje Telefona" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autoComplete='off'
								className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
							/>
							<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
								Broj telefona
							</span>
						</label>
					</div>
					<div className='role-select my-5 w-full border-2 border-black flex flex-col md:flex-row justify-evenly md:rounded-3xl overflow-hidden'>
						{roles.map((item, index) => (
							<div className={`flex-1 cursor-pointer transition-all text-center p-3 md:p-1 ${selectedRole == index ? 'bg-black text-white' : ''} `} onClick={() => handleRole(index)}>
								{item}
							</div>
						))}
					</div>
					<div className='footer flex items-center justify-center flex-col'>
						<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-slate-50 w-1/2 disabled:bg-gray-500' type='submit' disabled={isRegisterLoading}>Sačuvaj korisnika</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
