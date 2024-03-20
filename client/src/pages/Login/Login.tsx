import { useLoginMutation } from './../../app/api/sessionApiSlice';
import React, { useEffect, useState } from 'react';
import FormCard from '../../components/FormCard/FormCard';
import {LogIn} from "lucide-react"


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
                {/* Ide login komponenta sa states */}
                <FormCard onSubmitHandler={ handleLogin } title='Login' subtitle='subtitle is going here' Icon={<LogIn />}  >
                    <div className='FormItem w-full flex flex-col justify-start p-2  items-start'>
                        <label htmlFor="email" className='text-white my-2 font-semibold uppercase'>E-adresa</label>
                        <input id="email" className='w-full py-2 px-4 outline-none rounded-sm' type="text" value={email} placeholder='unesite vasu e-adresu' onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                    </div>
                    <div className='FormItem w-full flex flex-col justify-start p-2  items-start'>
                        <label htmlFor='password' className='text-white p-2 font-semibold uppercase'>Password</label>
                        <input id="password" className='w-full py-2 px-4 outline-none rounded-sm' type="password" value={password} placeholder='Unesite lozinku' onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
                    </div>
                </FormCard>

               
            </div>

        </>
    );
}

export default Login


//<Card className="">
//<form onSubmit={handleLogin}>
  //  <CardHeader>
    //    <CardTitle>Login</CardTitle>
      //  <CardDescription>Deploy your new project in one-click.</CardDescription>
    //</CardHeader>
    //<CardContent>
      //  <div className="grid w-full items-center gap-4">
        //    <div className="flex flex-col space-y-1.5">
          //      <Label htmlFor="email">E-adresa</Label>
            //    <Input id="email" type='email' placeholder="Unesite Vasu e-adresu" value={email} onChange={(e) => setEmail(e.target.value)} />
            //</div>
            //<div className="flex flex-col space-y-1.5">
              //  <Label htmlFor="password">Lozinka</Label>
                //<Input id="password" type='password' placeholder="Unesite Vasu lozinku" value={password} onChange={(e) => setPassword(e.target.value)} />
           // </div>
       // </div>
    // </CardContent>
    // <CardFooter className="flex flex-col justify-center gap-2">
       // <Button type="submit">Deploy</Button>
       // <Bu className="flex items-center justify-end transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
         //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
           //     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            // </svg>
            // <span className="inline-block ml-1">Zaboravili ste lozinku?</span>
       // </Bu/tton>
       // <Button /* onClick={() => setOpen(true)} */>Zaboravili ste lozinku?</Button>
    // </CardFooter>
// </form>
// </Card>
