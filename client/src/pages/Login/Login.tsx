import React, { useState } from 'react';
import { useLoginMutation } from './../../app/api/sessionApiSlice';
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import MutationState from '../../components/MutationState/MutationState';


const Login = () => {
	const navigate = useNavigate();
	const session = useSelector((state: RootState) => state.session);
	const location = useLocation();

	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	const [
		login,
		{
			isLoading: isLoginLoading,
			isSuccess: isLoginSuccess,
			isError: isLoginError,
			error: loginError
		}
	] = useLoginMutation();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				email,
				password
			};

			const result = await login(body).unwrap();
			let tempUni = "66057fc6f97b2ad52a249310"
			setTimeout(() => {
				// @ts-ignore
				// TODO get university where this user is service. (FROM service model)
				// console.log("Login result", result.user.universities);

				(location?.state?.from) ? navigate(location.state.from) : navigate(`/uni/${tempUni}`);
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
							<div className="card">
								<form onSubmit={handleLogin}>
									{/* Header */}
									<div className="form-header">
										<div className="form-title">Prijava</div>
										<div className="form-desc" >Prijavite se na Stud</div>
										<MutationState
											isLoading={isLoginLoading}
											isSuccess={isLoginSuccess}
											isError={isLoginError}
											successMessage='Uspešna prijava!'
											errorMessage='Greška prilikom prijavljivanja!'
										/>
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
										<Link to={`/reset/password/${email}`} className='text-gray-400 hover:underline'>Zaboravljena lozinka?</Link>
										<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' disabled={isLoginLoading} type='submit'>Prijavi se!</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					: <Navigate to={location?.state?.from || '/'} replace />
			}
		</>
	);
}

export default Login;
