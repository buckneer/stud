import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Session {
    accessToken: string,
    refreshToken: string
}

const initialState: Session = {
	accessToken: '',
	refreshToken: ''
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
		loggedOut() {
			return initialState;
		},
	}
});

export default sessionSlice.reducer;
export const {loggedOut, setAccess, setRefresh } = sessionSlice.actions;