import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendPasswordMailMutation } from '../../app/api/userApiSlice';
import InputField from '../../components/InputField/InputField';
import MutationState from '../../components/MutationState/MutationState';

const ResetPassword = () => {
	const { email } = useParams();
	const navigate = useNavigate();

	const [ inputEmail, setInputEmail ] = useState('');

	const [
		sendMail,
		{
			isLoading: isSendMailLoading,
			isSuccess: isSendMailSuccess,
			isError: isSendMailError,
			error: sendMailError
		}
	] = useSendPasswordMailMutation();


	const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const body = {
				email: inputEmail
			}

			const result = await sendMail(body).unwrap();	

			setTimeout(() => {
				navigate('/password');
			}, 1000);

		} catch (e: any) {
			console.error(e);
		}
	}

	useEffect(() => {
		if(email) {
			setInputEmail(email);
		}
	}, [ email ])

	return (
		<div className='flex justify-center items-center'>
			<div className="card">
				<div className='form-header'>
					<div className="form-title">Resetovanje lozinke</div>
					<div className="form-desc" >Promena Vaše lozinke</div>
					<MutationState 
              isLoading={isSendMailLoading}
              isSuccess={isSendMailSuccess}
              isError={isSendMailError}
              // @ts-ignore
              errorMessage={sendMailError?.data?.message || 'Greška prilikom postavljanja lozinke!'}
							successMessage='Uspešno slanje! Proverite Vašu e-poštu!'
						/>
				</div>
				<form onSubmit={handleResetPassword}>
					<InputField id="email" name="E-adresa" type="email" setVal={(e: any) => setInputEmail(e.target.value)} inputVal={inputEmail}/>
					<div className='footer flex items-center justify-center flex-col'>
						<button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Pošalji e-mail!</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword;