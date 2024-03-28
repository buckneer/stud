// import ReactCodeInput from 'react-code-input';
import React, { useEffect, useState } from 'react'
import InputField from '../../../components/InputField/InputField';
import { useParams } from 'react-router-dom';

const SetPassword = () => {
  const [ insertCode, setInsertCode ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ repeatPass, setRepeatPass ] = useState('');
  const [ codeVal, setCodeVal ] = useState('');

  const { code } = useParams();
  
  useEffect(() => {
    if(!code) {
      setInsertCode(true);
    }
  }, [ code ]);

  return (
    <div className='flex justify-center items-center'>
      <div className="card">
        {/* <div>
          <ReactCodeInput name="code" inputMode='full-width-latin' type='text' fields={8} onChange={(e) => console.log(e)} />
        </div> */}
        <InputField id="code" name="Kod" type="text" setVal={(e: any) => setCodeVal(e.target.value)} inputVal={codeVal} />
        <InputField id="password" name="Lozinka" type="password" setVal={(e: any) => setPassword(e.target.value)} inputVal={password}/>
        <InputField id="resetPassword" name="Ponovljena lozinka" type="password" setVal={(e: any) => setPassword(e.target.value)} inputVal={repeatPass}/>
      </div>
    </div>
  )
}

export default SetPassword;