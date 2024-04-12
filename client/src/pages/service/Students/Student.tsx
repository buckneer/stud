import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetStudentQuery } from '../../../app/api/studentApiSlice';
import Loader from '../../../components/Loader/Loader';
import MutationState from '../../../components/MutationState/MutationState';

const Student = () => {
  const { uni, student } = useParams();

  const {
    data: studentData,
    isLoading: isStudentLoading,
    isSuccess: isStudentSuccess,
    isError: isStudentError,
    error: studentError
  } = useGetStudentQuery({ university: uni!, id: student! }, {
    skip: !uni || !student
  });


  return (
    <> 
      <MutationState 
        isLoading={isStudentLoading}
      />
      { 
        isStudentSuccess && 
          <>
          {/* @ts-ignore */}
            { studentData?.user?.name }
          </>
      }
    </>
  )
}

export default Student;