import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useGetStudentsByDepartmentQuery, useGetUniDepartmentsQuery } from '../../../app/api/departmentApiSlice';
import MutationState from '../../../components/MutationState/MutationState';
import Table from '../../../components/Table/Table';
import TD from '../../../components/Table/TableColumn';

const Students = () => {
  const { uni } = useParams();

  const [ department, setDepartment ] = useState<string>('');
  
  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    isSuccess: isDepartmentsSuccess,
    isError: isDepartmentsError,
  } = useGetUniDepartmentsQuery(uni!, {
    skip: !uni
  });

  const {
    data: students,
    isLoading: isStudentsLoading,
    isSuccess: isStudentsSuccess,
    isError: isStudentsError
  } = useGetStudentsByDepartmentQuery({ university: uni!, id: department }, {
    skip: !uni || !department || !isDepartmentsSuccess
  });

  return (
    <>
      <MutationState
        isLoading={isDepartmentsLoading || isStudentsLoading}
      />
      <div className="w-full">
        { 
          isDepartmentsSuccess && 
          <>
            <div className="w-full flex justify-end">
              <Select className="w-1/3" maxMenuHeight={200} onChange={(e :any) => setDepartment(e?.value)} isClearable isSearchable options={departments!.map((dep: any) => ({
                value: dep._id, label: dep.name
              }))}/>
             </div>
            {
              isStudentsSuccess &&
                <div className="w-full flex justify-center">
                  <Table cols={['Student', 'Br. ind.', 'Semestar', 'Tip', 'Akcije']}>
                    {
                      students!.map((student: any) => (
                        <tr key={student._id}>
                          <TD>
                            { student.user.name }
                          </TD>
                          <TD>
                            { student.studentId }
                          </TD>
                          <TD>
                            { student.currentSemester }
                          </TD>
                          <TD>
                            { student.degree }
                          </TD>
                          <TD>
                            <Link to={`/uni/${uni}/student/${student._id}`}>Detalji</Link>
                          </TD>
                        </tr>
                      ))
                    }
                  </Table>
                </div> 
            }  
          </>
        }      
      </div>
    </>
  )
}

export default Students;