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
  name?: string;
	email?: string;
	students?: string[];
	professors?: string[];
	service?: string[];
	departments?: string[];
	parentUni?: string;
};

export interface Department {
	_id?: string;
	name?: string;
	university?: string;
	students?: string[];
	professors?: string[];
}

export interface Subject {
	_id?: string;
	name?: string;
	code?: string;
	professors?: string[];
	department?: string;
	espb?: number;
	requiredSub?: string[];
}

export interface Grade {
	_id?: string;
	subject?: string; 
	professor?: string;
	profesorGrade?: number;
	service?: string; 
	serviceGrade?: number;
	confirmed?: boolean;
	student: string;
	period?: string; 
}

export interface Period {
	_id?: string;
	start?: string;
	end?: string;
	exams?: string[];
	university?: string;
}

export interface Exam {
	_id?: string;
	date?: string;
	students?: string[];
	subject?: string;
	professor?: string //! Can be removed
	grades?: string[];
	period?: string;
	ended?: boolean;
}