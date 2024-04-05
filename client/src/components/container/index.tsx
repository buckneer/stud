import React, {ReactNode} from 'react';

export interface ContainerProps  {
    children: ReactNode,
    shrink?: boolean;
}

const Container = ({children, shrink} : ContainerProps) => {
    return <div className={`bg-slate-100 flex lg:mx-5 lg:mb-5 rounded-none lg:rounded-2xl flex-grow overflow-hidden routes-container transition-all ${shrink ? 'max-h-20 overflow-hidden' : ''}`}> {children} </div>;
}

export default Container;
