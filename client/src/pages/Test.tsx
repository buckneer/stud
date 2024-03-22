/*
*
* 
* FOR TESTING PURPOSES ONLY! DELETE IT AFTER TESTING EVERY SLICE!
* 
* 
*/

import React from 'react'

import { useGetAllUnisQuery } from '../app/api/uniApiSlice'
import { useGetDepartmentQuery } from '../app/api/departmentApiSlice';

const Test = () => {

	const {
		data
	} = useGetDepartmentQuery('65fcbc3cd45f1d327ffc4aee');

	return (
		<div>test</div>
	)
}

export default Test