import {Helmet} from "react-helmet";
import React from "react";
import StudTitle from "../../../components/StudTitle/StudTitle";
import Loader from "../../../components/Loader/Loader";
import UserItem from "../../../components/UserItem/UserItem";

function StudentHome() {
	return (
		<div className="">
			<Helmet>
				<title>Početna | Stud</title>
			</Helmet>
			<div className="flex h-full bg-slate-100">
				<div className="lists-container flex-1 h-full overflow-y-scroll py-5">
					<div className="list-header flex justify-between p-5 ">
						<StudTitle text={"Januarsko-Februarski ispitni rok"} />
						<div className="search-container">
							<input className='border-0 rounded-2xl bg-slate-100' type="text" placeholder="Pretraga" />
						</div>
					</div>
					<div className="lists grid grid-cols-3 gap-10 mx-5 overflow-y-auto">
						<h1>Hello World</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StudentHome
