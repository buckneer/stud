import React from 'react';
import {User} from "../../app/api/types/types";
import RandomBlob from "../RandomBlob/RandomBlob";
import { useNavigate } from "react-router-dom";
import {UserRoundX} from "lucide-react";
import { useDeleteUserMutation } from '../../app/api/userApiSlice';
import MutationState from '../MutationState/MutationState';

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

	const [
    deleteUser,
    {
      isLoading: isDeleteUserLoading,
      isSuccess: isDeleteUserSuccess,
      isError: isDeleteErrorSuccess
    }
  ] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
			console.log(`User '${user._id}' je spreman za brisanje!`);
			// TODO: add confirmation modal, then update the line below :D (or dont, IDGAF)
			const result = await deleteUser(user._id!).unwrap();
    } catch (e: any) {
      console.error(e);
    }
  }

	return (
		<div className="card overflow-hidden p-0 relative  w-full ">
			<MutationState 
				isLoading={isDeleteUserLoading}
			/>
			<div className="absolute right-2 top-2 p-2 z-[999] hover:text-red-900 cursor-pointer">
				<UserRoundX size={32} onClick={handleDeleteUser} />
			</div>
			<div className="flex justify-between p-5 cursor-pointer" onClick={() => handleRedirect()}>
				<div className="flex flex-col justify-center items-center font-black">
					<div className="">
						Nije
					</div>
					<div className="">
						Registrovan
					</div>
				</div>
				<div className="icon text-blue-300 mr-7">
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
