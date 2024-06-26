import {Helmet} from "react-helmet";
import React, {useEffect} from "react";
import StudTitle from "../../components/StudTitle/StudTitle";
import {BadgeAlert, BadgeCheck, Check, PlusCircle, SquareCheckBig, X} from "lucide-react";
import Table from "../../components/Table/Table";
import {Link, useParams} from "react-router-dom";
import {useGetUniPeriodsQuery, useSetPeriodActiveMutation} from "../../app/api/periodApiSlice";
import Loader from "../../components/Loader/Loader";
import TD from "../../components/Table/TableColumn";
import { formatDate } from "../../utils/formatDate";

function ServicePeriod() {

	const cols = ["Tip", "Semestar", "Ime", "Početak", "Kraj", "Prijava Ispita", "Aktivan", "Akcije"];
	const { uni } = useParams();


	

	const {
		data: periodData,
		isLoading,
		isError,
		isSuccess
	} = useGetUniPeriodsQuery({university: uni!});


	const [
		setPeriodState,
		{
			isLoading: periodActiveLoading,
			isError: periodActiveError,
			isSuccess: periodActiveSuccess
		}
	] = useSetPeriodActiveMutation();

	const handleSetPeriodState = async (state: boolean, period: string) => {
		try {
			await setPeriodState({university: uni!, period, active: state ? 'active' : 'finished'});
		} catch (e: any) {
			console.error(e)
		}
	}

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 w-full bg-white">
			<div className="list-header flex justify-between p-5 items-center ">
				<StudTitle text={"Ispitni Rokovi"} />
				<Link to={`/uni/${uni}/period/add`}>
					<div className="add-field flex gap-3 rounded-2xl bg-slate-100 p-2 border-[1px] border-slate-200 cursor-pointer hover:bg-slate-200">
						<h1 className="font-bold">Novi ispitni rok</h1>
						<PlusCircle />
					</div>
				</Link>
			</div>
			<div className="w-full flex justify-center">
				{isLoading || periodActiveLoading && <Loader />}
				{!isLoading && (
					<Table cols={cols}>
						{periodData && periodData.map(period => (
							<tr key={period._id}>
								<TD>{period.type == 0 ? 'Vanredni' : 'Regularni'}</TD>
								<TD>{period.semester ==	1 ? 'Zimski' : period.semester == 0 ? 'Letnji' : 'Oba'}</TD>
								<TD>{period.name}</TD>
								<TD>{formatDate(period.start!)}</TD>
								<TD>{formatDate(period.end!)}</TD>
								<TD>{formatDate(period.acceptDate!)}</TD>
								<TD className="flex justify-center items-center">{period.active ?
									(<div className="text-green-600"><BadgeCheck /></div> ) :
									(<div className="text-red-600"><BadgeAlert /></div> )}
								</TD>
								<TD>
									<div className="actions flex justify-center items-center">
										{period.active ?
											<X className="text-red-600 cursor-pointer" onClick={() => handleSetPeriodState(false, period._id!)} /> :
											<Check className="text-green-600 cursor-pointer" onClick={() => handleSetPeriodState(true, period._id!)} />}
									</div>
								</TD>
							</tr>
						))}
					</Table>

				)}
			</div>
		</div>
	);
}



export default ServicePeriod
