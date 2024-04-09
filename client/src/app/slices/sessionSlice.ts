import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { User, Session, Meta } from "../api/types/types";

const initialState: Session = {
	accessToken: '',
	refreshToken: '',
	user: {},
	metadata: {
		studentTab: 0,
		serviceHome: 0,
		professorTab: 0,
		university: '',
		role: ''
	}
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
				user: action.payload
			}
		},
		setMetadata(state, action: PayloadAction<Meta>) {
			return {
				...state,
				metadata: {
					...state.metadata,
					...action.payload
				}
			}
		},
		loggedOut() {
			return initialState;
		},
	}
});

export default sessionSlice.reducer;
export const { loggedOut, setAccess, setRefresh, setUser, setMetadata } = sessionSlice.actions;
