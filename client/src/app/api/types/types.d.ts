export interface Session {
	accessToken: string,
	refreshToken: string,
	user: User;
}

export interface User {
	_id?: string;
	email?: string;
	name?: string;
	role?: string;
	confirmed?: boolean;
	code?: string;
	phoneNumber?: string;
};

export interface Student {
	_id?: string;
	user?: string;
	studentId?: string;
	modelNum?: string;
	subjects?: string[];
	completedSubjects?: string[];
	department?: string;
	degree?: string;
	status?: string;
	dateOfEnrollment?: string;
	currentSemester?: string;
	grades?: string[];
	universities?: string[];
}

export interface Professor {
	_id?: string;
	title?: string;
	user?: string;
	subjects?: string[];
	grades?: string[];
	universities?: string[];
}

export interface Uni {
  _id?: string;
  name: string;
	students?: string[];
	professors?: string[];
	service?: string[];
	departments?: string[];
	parentUni?: string;
};

export interface Department {
	_id: string;
	name?: string;
	university?: string;
	students?: string[];
	professors?: string[];
}