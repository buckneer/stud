import { useLoginMutation } from './../../app/api/sessionApiSlice';
import React, { useEffect, useState } from 'react';
import { LogIn } from "lucide-react"

import { LockKeyhole } from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';


const Login = () => {
	const navigate = useNavigate();
	const session = useSelector((state: RootState) => state.session);

	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	const [
		fetchLogin,
		{
			data: loginData,
			isLoading: isLoginLoading,
			isSuccess: isLoginSuccess,
			isError: isLoginError,
			error: loginError
		}
	] = useLoginMutation();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// Login for handleLogin

		try {
			const body = {
				email,
				password
			};

			const result = await fetchLogin(body).unwrap();
			
			setTimeout(() => {
				navigate('/');
			}, 1000);

		} catch (error: any) {
			console.error(error);
		}
	}

	return (
		<>
			{
				!session.refreshToken ? 
					<div>
						<Helmet>
							<title>Login | Stud</title>
						</Helmet>
						<div className="flex-grow flex items-center justify-center">
							<form onSubmit={handleLogin} className="bg-white rounded-2xl p-4 w-1/3 shadow-md">
								{/* Header */}
								<div id="FormHeader" className="w-full">
			
									<div className='flex flex-col justify-center items-center'>
										<div className="text-3xl font-semibold p-2 uppercase text-blue-800">Login</div>
										<div className="text-gray-400 p-2" >Prijavite se na Stud</div>
									</div>
			
									<div id="FormHeader" className="w-full text-slate-100">
										{
											isLoginLoading ?
												<div className="">Loader ide ovde...</div>
												: null
										}
										{
											isLoginSuccess ?
												<div className="w-full flex justify-center">
													<div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">Uspešan login!</div>
												</div>
												: null
										}
										{
											isLoginError ?
												<div className="w-full flex justify-center">
													<div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">Greska prilikom prijavljivanja!</div>
												</div>
												: null
										}
									</div>
								</div>
								{/* Content */}
								<div className='FormItem w-full flex flex-col justify-start p-2 items-start relative'>
									<label htmlFor="UserEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
										<input
											type="email" id="UserEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
											className="peer pr-5 h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
										/>
										<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
											E-adresa
										</span>
										<span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 peer-focus/second:pt-2">
												<path
													fill-rule="evenodd" clip-rule="evenodd"
													d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
												/>
											</svg>
										</span>
									</label>
								</div>
								{/* ------- */}
								<div className='FormItem w-full flex flex-col justify-start p-2 items-start'>
									<label htmlFor="UserPassword" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
										<input
											type="password" id="UserPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'
											className="peer h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
										/>
										<span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
											Sifra
										</span>
									</label>
								</div>
								{/* FooterCard */}
								<div className='footer flex items-center justify-center flex-col'>
									<Link to="#" className='text-gray-400 hover:underline'>Zaboravljena lozinka?</Link>
									<button className='mt-5 bg-blue-800 px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit' disabled={isLoginLoading}>Login</button>
								</div>
			
							</form>
			
			
			
			
			
						</div>
					</div>
					: <Navigate to='/' replace />
			}
		</>
	);
}

export default Login;