import { useLoginMutation } from './../../app/api/sessionApiSlice';
import React, { useEffect, useState } from 'react';
import {LogIn} from "lucide-react"

import {LockKeyhole } from "lucide-react";
import {Link} from "react-router-dom";


const Login = () => {

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

            <div className="w-full h-screen flex justify-center items-center">
                <form onSubmit={handleLogin} className="md:block mx-4 md:mx-0 md:p-4 w-full md:w-1/2 lg:w-[450px] h-auto shadow-none md:shadow-md md:rounded-sm bg-[#31263E]">
                    {/* Header */}
                    <div id="FormHeader" className="w-full">
                        <div id="FormHeader" className="w-full text-slate-100">
                            { 
                                isLoginLoading ? 
                                        <div className="">Loader ide ovde...</div> 
                                        : null
                            }
                            { 
                                isLoginSuccess ?
                                    <div className="w-full flex justify-center">
                                        <div className="bg-green-200 border-2 border-green-400 w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 uppercase">Uspesan login!</div> 
                                    </div>
                                        : null
                            }
                            { 
                                isLoginError ? 
                                <div className="w-full flex justify-center">
                                    <div className="bg-red-200 border-2 border-red-400 w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 uppercase">Greska prilikom prijavljivanja!</div> 
                                </div>
                                        : null
                            }
					    </div>
                        <div className="text-3xl text-slate-100 font-semibold p-2 uppercase">Login</div>
                        <div className="text-slate-200 p-2 italic" >Prijavite se na iStud</div>
                    </div>
                    {/* Content */}
                    <div className='FormItem w-full flex flex-col justify-start p-2 items-start'>
                        <label htmlFor="UserEmail" className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
                            <input
                                type="email" id="UserEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'
                                className="peer h-8 w-full border-none p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                E-adresa
                            </span>
                        </label>
                    </div>

                    <div className='FormItem w-full flex flex-col justify-start p-2 items-start'>
                    <label  htmlFor="UserPassword"className="relative block overflow-hidden rounded-md bg-white px-3 pt-3 shadow-sm w-full">
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
                    <div className="FormFooter w-full flex justify-evenly pt-5 gap-2">
                    <div className="flex text-sm italic justify-center items-center gap-3 text-slate-500 hover:text-slate-200 hover:cursor-pointer">
                    <LockKeyhole strokeWidth={0.5}/>
                    <Link to="#">zaboravili ste lozinku</Link>
                    </div>
                        <button className="py-2 px-4 bg-slate-300 hover:bg-slate-100 rounded-sm" type="submit"><LogIn /></button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;