import React, {ReactNode} from 'react';

export interface ContainerProps  {
    children: ReactNode,
    shrink?: boolean;
}

const Container = ({children, shrink} : ContainerProps) => {
    return <div className={`bg-slate-100 m-5 rounded-2xl flex-grow overflow-hidden routes-container transition-all ${shrink ? 'max-h-20 overflow-hidden' : ''}`}> {children} </div>;
}

export default Container;
