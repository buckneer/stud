import React from 'react'
import { Session } from '../../../app/api/types/types';
import StudTitle from '../../../components/StudTitle/StudTitle';
import Table from '../../../components/Table/Table';
import { useGetUserSubjectsQuery } from '../../../app/api/userApiSlice';
import TD from '../../../components/Table/TableColumn';

export interface IStudentSubject {
	session: Session,
	uni?: string;
}

const cols = ['Kod', 'Semestar', 'Naziv', 'ESPB', 'Tip']

const StudentSubject = ({ session, uni }: IStudentSubject) => {
  const {
    data: subjects,
    isLoading: isSubjectsLoading,
    isSuccess: isSubjectsSuccess,
    isError: isSubjectsError
  } = useGetUserSubjectsQuery(uni!, {
    skip: !uni
  });
  
  return (
    <div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full">
      <div className="list-header flex justify-between p-5 ">
        <StudTitle text='Predmeti' />
        <div className="search-container flex items-center justify-center gap-10 mr-10">
          <input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
        </div>
      </div>

      <div className="w-full flex justify-center">    
        { 
          isSubjectsSuccess && 
            <>
              <Table cols={cols}>
                {subjects.subjects.map((row: any) => (
                  <tr>
                    <TD>{row.code}</TD>
                    <TD>{row.semester}</TD>
                    <TD>{row.name}</TD>
                    <TD>{row.espb}</TD>
                    <TD>{row.type === 'R' ? 'O' : 'I'}</TD>
                  </tr>
                ))}
              </Table>
            </>
        }
      </div>
    </div>
  )
}

export default StudentSubject