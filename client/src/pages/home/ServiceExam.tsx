import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetExamsQuery } from '../../app/api/examApiSlice';
import StudTitle from '../../components/StudTitle/StudTitle';
import { CirclePlus } from 'lucide-react';
import { useGetActivePeriodQuery } from '../../app/api/periodApiSlice';

const ServiceExam = () => {
  const { uni } = useParams();
  const [ search, setSearch ] = useState('');

  const {
    data: examData,
    isLoading: isExamLoading,
    isSuccess: isExamSuccess,
    isError: isExamError
  } = useGetExamsQuery(uni!);

  return (
    <>
      <div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
				<div className="list-header flex justify-between p-5 items-center">
          <StudTitle text="Ispiti" />
          <div className="search-container flex justify-center items-center gap-3">
						<Link to={`/uni/${uni}/subject/add`} className="add-field flex gap-3 rounded-2xl bg-slate-100 p-2 border-[1px] border-slate-200 cursor-pointer hover:bg-slate-200	">
							<div className="flex">
								<div className="font-semibold">
                  Novi ispit
								</div>
							</div>
							<CirclePlus size={26} />
						</Link>
						<input className="border-0 rounded-2xl bg-slate-100" id='search' placeholder='Pretraga' name='Pretraga' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
					</div>
        </div>
      </div>
    </>
  )
}

export default ServiceExam;