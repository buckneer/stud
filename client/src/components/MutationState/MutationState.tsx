import React from 'react'
import Loader from '../Loader/Loader';

interface States {
  isLoading?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  isError?: boolean;
  errorMessage?: string | any;
  error?: any;
}

const MutationState = ({
  isLoading, isSuccess, successMessage = 'Uspešna izmena!', 
  isError, errorMessage = 'Došlo je do greške!', error
}: States) => {
  
  let content: any;

  if(isLoading) {
    content = <Loader />
  } else if (isSuccess && !isLoading) {
    content =
    <div className="w-full flex justify-center">
      <div className="bg-green-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-green-800 font-bold">{ successMessage }</div>
    </div>
  } else if (isError && !isLoading) {
    content = 
    <div className="w-full flex justify-center">
      <div className="bg-red-200 rounded-2xl w-1/2 md:w-2/3 p-2 text-center my-2 text-red-800 font-bold">{ errorMessage }</div>
    </div>
  }
  return (    
    <>{ content }</>
  );
}

export default MutationState;