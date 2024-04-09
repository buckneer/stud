import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="flex justify-center items-center">
			<div className="">
				<h1 className="font-black text-8xl">404</h1>
				<h1 className="font-bold text-4xl">Stranica ne postoji</h1>
				<Link className="flex mt-2 text-xl items-center hover:-translate-x-3 transition animate-pulse font-bold hover:animate-none hover:underline" to='/'><ChevronLeft size={30} />Vrati se na početnu?</Link>
			</div>

		</div>
	);
}

export default NotFound

