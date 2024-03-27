import React from 'react';
import {User} from "../../app/api/types/types";
import RandomBlob from "../RandomBlob/RandomBlob";
import { useNavigate } from "react-router-dom";


interface UserItemProps {
	user: User,
	university: string,
	role: string
}

function UserItem({user, university, role}: UserItemProps) {

	const navigate = useNavigate();
	const handleRedirect = () => {
		navigate(`/uni/${university}/${role}/add`, {
			state: {
				user,
				for: role
			}
		});
	}

	return (
		<div className="card overflow-hidden p-0  w-full cursor-pointer" onClick={() => handleRedirect()}>
			<div className="flex justify-between p-5">
				<div className="flex flex-col justify-center items-center font-black">
					<div className="">
						Nije
					</div>
					<div className="">
						Registrovan
					</div>
				</div>
				<div className="icon text-blue-300">
					<RandomBlob width={100} height={100} />
				</div>
			</div>
			<div className="bg-slate-100 p-3">
				<h1 className=' font-black'>{user.name}</h1>
				<p>{user.email}</p>
			</div>
		</div>
	);
}

export default UserItem
