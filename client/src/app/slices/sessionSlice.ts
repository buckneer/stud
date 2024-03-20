import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
	email?: string;
	name?: string;
	role?: string;
	confirmed?: boolean;
	studentId?: string;
}

export interface Session {
    accessToken: string,
    refreshToken: string,
	user: User
}

const initialState: Session = {
	accessToken: '',
	refreshToken: '',
	user: {}
}

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setAccess(state, action: PayloadAction<string>) {
			return {
				...state,
				accessToken: action.payload
			}
		},
		setRefresh(state, action: PayloadAction<string>) {
			return {
				...state,
				refreshToken: action.payload
			}
		},
		setUser(state, action: PayloadAction<User>) {
			return {
				...state,
				...action
			}
		},
		loggedOut() {
			return initialState;
		},
	}
});

export default sessionSlice.reducer;
export const {loggedOut, setAccess, setRefresh, setUser } = sessionSlice.actions;