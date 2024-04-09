import {
	LogOut,
	University,
} from "lucide-react";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useParams } from "react-router";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useGetUserUniRoleQuery, useGetUserUnisRoleQuery } from "../../app/api/userApiSlice";
import {setMetadata} from "../../app/slices/sessionSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../app/api/sessionApiSlice";


export interface SidebarProps {
	children: string | JSX.Element | JSX.Element[],
	uniId?: string,
	role?: string
}

function Sidebar({children, role = 'student'} : SidebarProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const session = useSelector((state: RootState) => state.session);
  const {uni} = useParams();
	// const [currentUni, setCurrentUni] = useState("PMF"); if we want to switch uni

	const roles = {
		student: 'Student',
		service: 'Služba',
		professor: 'Profesor'
	}

	const {
		data: uniData,
		isLoading: isUniDataLoading,
		isSuccess: isUniDataSuccess,
		isError: isUniDataError
		// @ts-ignore
  } = useGetUserUnisRoleQuery({ user: session.user._id, role }, {
		skip: !uni || !session.accessToken
	});

	const {
		data: rolesData,
		isLoading: isRolesLoading,
		isSuccess: isRolesSuccess,
		isError: isRolesError
	} = useGetUserUniRoleQuery(session.metadata.university || uni!);
	
	const [ logout ] = useLogoutMutation();


	const setUniversity = (university: string) => {
		dispatch(setMetadata({ university }));
		navigate(`/uni/${university}/${role}`);
	}

	const handleRoleChange = (role: any) => {
		dispatch(setMetadata({ role }));
		navigate(`/uni/${uni}/${role}`);
	}

	const handleLogout = async () => {
		try {
			await logout({ refreshToken: session.refreshToken });
		} catch (e: any) {
			console.error(e);
		}
	}

	let uniContent: any;

	if (isUniDataLoading) {
		uniContent = <option>Učitavam...</option>
	} else if (isUniDataSuccess) {
		uniContent = uniData.map(uni => <option value={uni.university._id}>{ uni.university.name }</option>)
	}

	useEffect(() => {
		if(uniData && !session.metadata.university) {
			dispatch(setMetadata({ university: uniData[0].university._id }));
		}
	}, [ isUniDataSuccess ]);

	return (
		<div className='sidebar hidden xl:flex flex-col items-center divide-y-2 bg-slate-100 px-5 py-5'>
			<div className="flex flex-col items-center gap-3 px-5 pb-4">
				<University className="text-gray-700" size={100} />
				{/* Maybe change this to state? */}
				{ 
					isRolesSuccess && session?.user?.roles?.length! > 1 &&
					<>
						<select value={role} onChange={(e) => handleRoleChange(e.target.value)} className="rounded-xl border-0 w-full">
							{
								rolesData?.map((role: any) => (
									<>
										{/* @ts-ignore */}
										<option value={role}>{ roles[role] }</option>
									</>
								))
							}
						</select>
						<p>Nalog {role === 'service' ? 'STUD službe' : role === 'professor' ? 'profesora' : 'STUDenta'}</p>
						<select value={session.metadata.university} className="border-0 rounded-xl w-full" onChange={(e: any) => setUniversity(e.target.value)}>
							{ uniContent }
						</select>
					</>
				}
				
				{/*<h1 className="font-black">Logged in</h1>*/}
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="pt-5 w-full flex flex-col gap-2 divide-y-2">
					{children}
				</div>
				<div onClick={handleLogout}>
					<SidebarItem name="Odjavi se" Icon={LogOut} />
				</div>
			</div>
		</div>
	);
}

export default Sidebar
