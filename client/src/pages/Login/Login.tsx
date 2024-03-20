import { useLoginMutation } from './../../app/api/sessionApiSlice';
import React, { useEffect } from 'react';

const Login = () => {
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

    const handleLogin = async () => {
        try {
            const body = {

            };

            const result = await fetchLogin(body).unwrap();
        } catch (error: any) {
            console.error(error); 
        }     
    }

    useEffect(() => {
        document.title = 'Login | Stud';
    }, []);

    return (
        <>
            {/* { 
                isLoginLoading ? 
                    <>Loader ide ovde...</> 
                    : null
            }
            { 
                isLoginSuccess ? 
                    <>Uspesan login</> 
                    : null
            }
            { 
                isLoginError ? 
                    <>Greska</> 
                    : null
            } */}
            <div>
                {/* Ide login komponenta sa states */}
            </div>
        
        </>
    );
}

export default Login