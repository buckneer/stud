import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { setMetadata } from '../../app/slices/sessionSlice';

const TokenRequired = () => {
	const session = useSelector((state: RootState) => state.session);
	const dispatch = useDispatch();
	const location = useLocation();

	let { uni } = useParams();

	if(uni && session.metadata?.university !== uni) {
		dispatch(setMetadata({ university: uni }));	
	}

	return session.refreshToken ? <Outlet /> : <Navigate to='/login' state={{ from: location  }} replace /> 
}

export default TokenRequired;