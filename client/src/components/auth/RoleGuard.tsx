import React from 'react'
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserUniRoleQuery } from '../../app/api/userApiSlice';
import Loader from '../Loader/Loader';
import { setMetadata } from '../../app/slices/sessionSlice';

interface IRoleGuard {
	roles?: string[];
}

const RoleGuard = ({ roles }: IRoleGuard) => {
	const session = useSelector((state: RootState) => state.session);
	const { uni } = useParams();
	const dispatch = useDispatch();

	const {
		data: roleData,
		isLoading: isRolesLoading,
		isSuccess: isRolesSuccess,
		isError: isRolesError
	} = useGetUserUniRoleQuery(uni!, {
		skip: !uni || !session.refreshToken
	});

	if(!isRolesLoading && isRolesSuccess) {
		if(session.metadata?.university !== uni) {
			dispatch(setMetadata({ university: uni, role: session.metadata.role || roles![0] }));	
		}
		
		return (roleData.some((role: any) => roles?.indexOf(role) !== -1)) ? <Outlet /> : <Navigate to="/error" replace/>
	} else if (isRolesError) {
		return <Navigate to="/error" replace />
	}
	return <Loader />
}

export default RoleGuard;