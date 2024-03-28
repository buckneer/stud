// import ReactCodeInput from 'react-code-input';
import React, { useEffect, useState } from 'react'
import InputField from '../../components/InputField/InputField';
import { useParams } from 'react-router-dom';
import CodeInput from '../../components/CodeInput/CodeInput';
import { useSetNewPasswordMutation } from '../../app/api/userApiSlice';
import MutationState from '../../components/MutationState/MutationState';

const SetPassword = () => {
  const { code } = useParams();

  const [ insertCode, setInsertCode ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ repeatPass, setRepeatPass ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ codeVal, setCodeVal ] = useState('');

  
  const [
    setNewPassword,
    {
      isLoading: isSetNewPasswordLoading,
      isSuccess: isSetNewPasswordSuccess,
      isError: isSetNewPasswordError,
      error: setNewPasswordError
    }
  ] = useSetNewPasswordMutation();

  useEffect(() => {
    if(!code) {
      setInsertCode(true);
    }
  }, [ code ]);

  const handleSetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

    try {
      const body = {
        email, password, code: codeVal
      }

      const result = await setNewPassword(body).unwrap();
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className="card">
        <form onSubmit={handleSetPassword}>
          <div className='form-header'>
            <div className="form-title">Registracija</div>
            <div className="form-desc">Pridruži se STUD-u!</div>
            <MutationState 
              isLoading={isSetNewPasswordLoading}
              isSuccess={isSetNewPasswordSuccess}
              isError={isSetNewPasswordError}
              // @ts-ignore
              errorMessage={setNewPasswordError?.data?.message || 'Greška prilikom postavljanja lozinke!'}
              successMessage='Uspešno ste postavili svoju lozinku!'
            />
          </div>
          <p className="text-center font-bold mb-1">KOD</p>
          <CodeInput className="pb-4 mb-2 border-b-2" codeFunc={(code: string) => setCodeVal(code)} insertCode={insertCode ? '' : code} />
          <InputField id="email" name="E-adresa" type="email" setVal={(e: any) => setEmail(e.target.value)} inputVal={email}/>
          <InputField id="password" name="Lozinka" type="password" setVal={(e: any) => setPassword(e.target.value)} inputVal={password}/>
          <InputField id="resetPassword" name="Ponovljena lozinka" type="password" setVal={(e: any) => setRepeatPass(e.target.value)} inputVal={repeatPass}/>
          <p className="text-xs text-gray-500 mx-2">* Prilikom odabira lozinke preporučeno je koristiti velika i mala slova, specijalne karaktere i brojeve!</p>
          <div className='footer flex items-center justify-center flex-col'>
            <button className='mt-5 bg-black px-5 py-2 rounded-2xl text-white w-1/2 disabled:bg-gray-500' type='submit'>Završi registraciju!</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SetPassword;