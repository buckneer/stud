import React, {useState} from "react";
import {Book, CalendarCheck, CircleUser, CircleX, Component, FolderArchive, GraduationCap, LayoutList, LogOutIcon, Menu, ScrollText, User} from "lucide-react";
import NavItem from "./NavItem";
import { useLogoutMutation } from "../../app/api/sessionApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetUserUnisRoleQuery } from "../../app/api/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { setMetadata } from "../../app/slices/sessionSlice";

function HamburgerMenu() {
	const session = useSelector((state: RootState) => state.session);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const [ logout ] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logout({ refreshToken: session.refreshToken });
		} catch (e: any) {
			console.error(e);
		}
	}

	const {
		data: uniData
	} = useGetUserUnisRoleQuery({ user: session.user._id!, role: session.metadata.role! });

	const handleLinkChange = (index: number, url = `/uni/${session.metadata.university}/${session.metadata.role}`) => {
		if(session.metadata.role === 'service') {
			dispatch(setMetadata({ serviceHome: index }));
		}	else if (session.metadata.role === 'professor') {
			dispatch(setMetadata({ professorTab: index }));
		} else {
			dispatch(setMetadata({ studentTab: index }));
		}
		
		navigate(url);
		setOpen(false);
	}

	return (
		<div className="navbar bg-black pb-5 text-white mx-7 mt-3 flex align-center justify-between z-[999]">
			<div className='branding flex items-center flex-1 text-white'>
				<h1 className='font-black text-2xl'>STUD</h1>
			</div>
			<div className="menu">
				<Menu size={32} onClick={()=> setOpen(prevState => !prevState)} />
			</div>
			{open && (
				<div className={`absolute left-0 w-full bg-black z-[999] transition-all ${open ? 'h-full' : 'h-0'}`}>
					<div className="navbar bg-black text-white mx-7 mt-3 flex align-center justify-between z-[999]">
						<div className='branding flex items-center flex-1 text-white'>
							<h1 className='font-black text-2xl'>STUD</h1>
						</div>
						<div className="menu">
							<CircleX size={32} onClick={()=> setOpen(prevState => !prevState)} />
						</div>
					</div>
					<div className="w-full flex flex-col justify-between h-[90%] overflow-y-hidden">
						<div className="divide-y-2">
							<div className="">
								{
									session.metadata.role === 'service' ? 
										<>
											<div className="divide-y-2">
												<div>
													<div onClick={() => handleLinkChange(0)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<GraduationCap />
															<div className="font-black">STUDenti</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(1)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<User />
															<div className="font-black">Profesori</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(2)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<FolderArchive />
															<div className="font-black">STUD služba</div>
														</div>
													</div>
												</div>
												<div>
													<div onClick={() => handleLinkChange(3)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<CalendarCheck />
															<div className="font-black">Ispitni rokovi</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(4)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<LayoutList />
															<div className="font-black">Ispiti</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(5)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<Component />
															<div className="font-black">Odseci</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(6)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<Book />
															<div className="font-black">Predmeti</div>
														</div>
													</div>
													<div onClick={() => handleLinkChange(7)}>
														<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
															<ScrollText />
															<div className="font-black">Ocene</div>
														</div>
													</div>
												</div>
											</div>
												
										</>
									: session.metadata.role === 'professor' ? 
										<>
										<div onClick={() => handleLinkChange(0)}>
											<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
												<GraduationCap />
												<div className="font-black">STUDenti</div>
											</div>
										</div>
										<div onClick={() => handleLinkChange(1)}>
											<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
												<CalendarCheck />
												<div className="font-black">Ispitni rokovi</div>
											</div>
										</div>
										<div onClick={() => handleLinkChange(2)}>
											<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
												<LayoutList />
												<div className="font-black">Ispiti</div>
											</div>
										</div>	
										<div onClick={() => handleLinkChange(3)}>
											<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
												<Book />
												<div className="font-black">Predmeti</div>
											</div>
										</div>	
										
										</>
									: 
										<>
											<div onClick={() => handleLinkChange(0)}>
												<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
													<CircleUser />
													<div className="font-black">Početna</div>
												</div>
											</div>
											<div onClick={() => handleLinkChange(1)}>
												<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
													<CalendarCheck />
													<div className="font-black">Ispitni rokovi</div>
												</div>
											</div>
											<div onClick={() => handleLinkChange(2)}>
												<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
													<LayoutList />
													<div className="font-black">Ispiti</div>
												</div>
											</div>
											<div onClick={() => handleLinkChange(3)}>
												<div className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
													<Book />
													<div className="font-black">Predmeti</div>
												</div>
											</div>
										</>
								}
							</div>
						</div>
						<div className="">
							<div onClick={handleLogout} className="icon flex justify-center gap-4 p-3 m-3 rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
								<LogOutIcon />
								<div className="font-black">Odjavi se</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default HamburgerMenu
