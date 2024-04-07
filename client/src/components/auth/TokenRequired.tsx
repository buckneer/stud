import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { setMetadata } from '../../app/slices/sessionSlice';

const TokenRequired = () => {
	const session = useSelector((state: RootState) => state.session);
	const location = useLocation();

	return session.refreshToken ? <Outlet /> : <Navigate to='/login' state={{ from: location  }} replace /> 
}

export default TokenRequired;