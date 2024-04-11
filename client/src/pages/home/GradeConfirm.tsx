import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetActivePeriodQuery } from '../../app/api/periodApiSlice';
import Loader from '../../components/Loader/Loader';
import StudTitle from '../../components/StudTitle/StudTitle';
import { Table } from 'lucide-react';
import { useGetUniDepartmentsQuery } from '../../app/api/departmentApiSlice';
import { useGetDepSubjectsQuery } from '../../app/api/subjectApiSlice';
import MutationState from '../../components/MutationState/MutationState';
import { Select } from '@radix-ui/react-select';

const GradeConfirm = () => {
  const { uni } = useParams();

  const [ department, setDeparment ] = useState<string>('');
  const [ subject, setSubject ] = useState<string>('');

  const {
		data: activePeriod,
		isLoading: isPeriodLoading,
		isSuccess: isPeriodSuccess,
		isError: isPeriodError
	} = useGetActivePeriodQuery(uni!);

  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    isSuccess: isDepartmentsSuccess,
    isError: isDepartmentsError
  } = useGetUniDepartmentsQuery(uni!, {
    skip: !uni || !activePeriod?._id
  });

  const {
    data: subjects,
    isLoading: isSubjectsLoading,
    isSuccess: isSubjectsSuccess,
    isError: isSubjectsError
  } = useGetDepSubjectsQuery({ university: uni!, department }, {
    skip: !isDepartmentsSuccess || !department
  });


  // const {
  //   data: grades,
  //   isLoading: isGradesLoading,
  //   isSuccess: isGradesSuccess,
  //   isError: isGradesError
  // } = us

  return (
    <>
      <MutationState 
        isLoading={isPeriodLoading || isSubjectsLoading || isDepartmentsLoading}
      />
      <div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
        <div className="list-header flex justify-between p-5 items-center">
          { 
            isPeriodSuccess && !isPeriodLoading && isDepartmentsSuccess ? 
              <>
                <StudTitle text='Ocene' />
                <div className="flex">
                  <Select name="Odsek"/>
                </div>
              </> : <>Nema aktivnog ispitnog roka...</>
          }
        </div>

          {/* { 
            isPeriodSuccess && isGradesSuccess && isDepartmentsSuccess && isSubjectSuccess
              <Table>
                { grades.map(()) => ()}
                <tr key=>

                </tr>
              </Table>
          } */}
      </div>
    </>
  )
}

export default GradeConfirm;