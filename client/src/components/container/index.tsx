



export interface ContainerProps  {
    children: string | JSX.Element | JSX.Element[]
}

const Container = ({children} : ContainerProps) => {
    return <div className='bg-slate-100 m-5 rounded-2xl flex-1 p-5 routes-container'> {children} </div>;
}



export default Container;
