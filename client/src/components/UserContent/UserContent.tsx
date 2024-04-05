import {User} from "../../app/api/types/types";
import Loader from "../Loader/Loader";
import UserItem from "../UserItem/UserItem";
import React from "react";
import {useGetPendingQuery} from "../../app/api/userApiSlice";
import StudTitle from "../StudTitle/StudTitle";
import {useGetProfessorsQuery} from "../../app/api/professorApiSlice";


export interface UserContentProps {
	title: string;
	university: string;
	role: string;

}


function UserContent({title, university, role}: UserContentProps) {

	const {
		data,
		isLoading,
		isSuccess,
		isError
	} = useGetPendingQuery({university, role});


	const {
		data: savedData,
		isLoading : dataLoading,
		isSuccess: dataSuccess,
		isError: dataError
	} = useGetProfessorsQuery(university)

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5 bg-white">
			<div className="list-header flex justify-between p-5 ">
				<StudTitle text={title} />
				<div className="search-container">
					<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
				</div>
			</div>
			<div className="lists grid grid-cols-3 gap-10 mx-5 overflow-y-auto py-3">
				{isLoading && <Loader />}
				{isSuccess && (
					data.length ? (
						data.slice(0,3).map(user => (
							<UserItem user={user} university={university} role={role}/>
						))
					) :
						<div className="">
							Svaka čast
						</div>
				)}
			</div>
			<div className="list-header flex p-5 justify-between">
				<h1 className="font-black">Svi {title}</h1>
				<p className="cursor-pointer">Pogledaj sve</p>
			</div>
			<div className="lists grid grid-cols-3 gap-10 mx-5 overflow-y-auto py-3">
				{dataLoading && <Loader />}
				{dataSuccess && (
					savedData.length ? (
							savedData.slice(0,3).map((user: any) => (
								<UserItem user={user.user} university={university} role={role} />
							))
						) :
						<div className="">
							<h1>Svaka cast</h1>
						</div>
				)}

			</div>
		</div>
	);
}

export default UserContent
