import {User} from "../../app/api/types/types";
import Loader from "../Loader/Loader";
import UserItem from "../UserItem/UserItem";
import React from "react";
import {useGetPendingQuery} from "../../app/api/userApiSlice";
import StudTitle from "../StudTitle/StudTitle";


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

	return (
		<div className="lists-container flex-1 h-full overflow-y-scroll py-5">
			<div className="list-header flex justify-between p-5 ">
				<StudTitle text={title} />
				<div className="search-container">
					<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
				</div>
			</div>
			<div className="lists grid grid-cols-3 gap-10 mx-5 overflow-y-auto">
				{isLoading && <Loader />}
				{isSuccess && (
					data ? (
						data.map(user => (
							<UserItem user={user} university={university} role={role}/>
						))
					) :
						<div className="">
							Svaka čast
						</div>
				)}
			</div>
		</div>
	);
}

export default UserContent
