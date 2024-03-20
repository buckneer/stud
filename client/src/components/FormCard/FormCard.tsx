import React from "react";
import {LockKeyhole, LucideIcon } from "lucide-react";
import {Link} from "react-router-dom";
type FormCardProps = {
    children?: React.ReactNode,
    title?: string,
    subtitle?: string,
    logo?: string,
    onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void,
    Icon?:  JSX.Element
}



const FormCard = ({ ...props }: FormCardProps) => {
    const { title, subtitle, children, onSubmitHandler, Icon } = props;
  return (
      <form onSubmit={onSubmitHandler} className="md:block mx-4 md:mx-0 md:p-4 w-full md:w-1/2 lg:w-[450px] h-auto shadow-none md:shadow-md md:rounded-sm bg-[#1f2937]">
        <div id="FormHeader" className="w-full">
          <div className="text-3xl text-slate-100 font-semibold p-2 uppercase">{title}</div>
          <div className="text-slate-200 p-2 italic" >{subtitle}</div>
        </div>
        <div id="FormContent" className="">
          { children }
        </div>
        <div className="FormFooter w-full flex justify-evenly pt-5 gap-2">
        {/* Implement setOpen */}
        {/* <button onClick={() => setOpen(!open)}>Zaboravili ste lozinku</button> */}
        <div className="flex text-xs italic justify-center items-center gap-3 text-slate-500 hover:text-slate-200 hover:cursor-pointer">
          <LockKeyhole strokeWidth={0.5}/>
          <Link to="#">zaboravili ste lozinku</Link>
        </div>
        <button className="py-2 px-4 bg-slate-300 hover:bg-slate-100 rounded-sm" type="submit">{Icon}</button>
        </div>
      </form>
  );
}

export default FormCard



