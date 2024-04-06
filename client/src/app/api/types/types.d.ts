export interface Meta {
	university?: string;
	studentTab?: number;
	professorTab?: number;
	serviceHome?: number;
	role?: string;
}

export interface Session {
	accessToken: string,
	refreshToken: string,
	user: User;
	metadata: Meta;
}

export interface User {
	_id?: string;
	email?: string;
	name?: string;
	roles?: string[];
	confirmed?: boolean;
	code?: string;
	phoneNumber?: string;
};

export interface Student {
	_id?: string;
	user?: string | User;
	studentId?: string;
	modelNum?: string;
	subjects?: string[] | Subject[];
	completedSubjects?: string[] | Subject[];
	department?: string | Department;
	degree?: string;
	status?: string;
	dateOfEnrollment?: string;
	currentSemester?: any;
	grades?: string[] | Grade[];
	university?: string | Uni;
	signs?: string[] | Subject[];
}

export interface Professor {
	_id?: string;
	title?: string;
	user?: string | User;
	subjects?: string[] | Subject[];
	grades?: string[] | Grade[];
	universities?: string[] | Uni[];
}

export interface Uni {
  _id?: string;
  name?: string;
	email?: string;
	students?: string[] | Student[];
	professors?: string[] | Professor[];
	services?: string[] | Service[];
	departments?: string[] | Department[];
	parentUni?: string;
};

export interface Department {
	_id?: string;
	name?: string;
	university?: string | University;
	students?: string[] | Student[];
	professors?: string[] | Professor[];
}

export interface Subject {
	_id?: string;
	name?: string;
	code?: string;
	professors?: string[] | Professor[];
	department?: string;
	university?: string | Uni;
	espb?: number;
	type?: string;
	degree?: string;
	semester?: any;
	requiredSub?: string[] | Subject[];
}

export interface Optional {
	_id?: string;
	name?: string;
	espb?: number;
	subjects?: string[] | Subject[];
	semester?: any;
	department: string | Department;
	university: string | University;
}

export interface Grade {
	_id?: string;
	subject?: string | Subject;
	professor?: string | Professor;
	profesorGrade?: number;
	service?: string | Service;
	serviceGrade?: number;
	confirmed?: boolean;
	student?: string | Student;
	period?: string | Period;
}

export interface Period {
	_id?: string;
	name?: string;
	type?: number;
	semester?: number;
	start?: string;
	end?: string;
	exams?: string[] | Exam[];
	university?: string | University;
	acceptDate?: string;
}

export interface Exam {
	_id?: string;
	date?: string;
	students?: string[] | Student[];
	subject?: string | Subject;
	professor?: string | Professor //! Can be removed
	grades?: string[] | Grade[];
	period?: string | Period;
	ended?: boolean;
	department?: string | Department;
	university?: string | University;
}

export interface Service {
	_id?: string;
	user?: string | User;
	university?: string | University;
}

// Subject
export interface UniUser {
	university: string,
	body: Student
}

export interface UpdateStudent {
	university: string;
	id: string;
	body: Student;
}

export interface AddUni {
	university: string;
	body: {
		students: string[];
	}
}

export interface DelUni {
	university: string;
	body: {
		student: string;
	}
}

export interface AddStExam {
	university: string;
	student: string | undefined;
	body: {
		exams: string[];
	}
}

export interface DelStExam {
	university: string;
	student: string;
	body: {
		exam: string;
	}
}

export interface AddStSub {
	university: string;
	body: {
		subjects: string[];
	}
}

// Uni API slice
export interface UpdateUni {
	id: string;
	body: Uni;
}

export interface AddUniDep {
	university: string;
	body: {
		departments: string[];
	}
}

export interface DelDep {
	university: string;
	body: {
		department: string;
	};
}

export interface AddUniSer {
	university: string;
	body: {
		services: string[];
	}
}

export interface DelUniSer {
	university: string;
	body: {
		service: string;
	}
}

// Optional API slice
export interface AddSubjOpt {
	university: string;
	optional: string;
	body: {
		subjects: string[];
	}
}

export interface GetOpt {
	university: string;
	body: {
		semester: string;
		department: string;
	}
}

// Department API slice
export interface UniDep {
	university: string;
	body: Department
}

export interface UpdateDep {
	university: string;
	id: string;
	body: Department;
}

export interface AddUniDep {
	university: string;
	body: {
		departments: string[];
	}
}

export interface DelDep {
	university: string;
	body: {
		department: string;
	};
}

export interface AddStDep {
	university: string;
	department: string;
	body: {
		students: string[];
	}
}

export interface DelStDep {
	university: string;
	department: string;
	body: {
		student: string;
	}
}

export interface AddProfDep {
	university: string;
	department: string;
	body: {
		professors: string[];
	}
}

export interface DelProfDep {
	university: string;
	department: string;
	body: {
		professor: string;
	}
}

export interface AddSubDep {
	university: string;
	department: string;
	body: {
		subjects: string[];
	}
}

export interface DelSubDep {
	university: string;
	department: string;
	body: {
		subject: string;
	}
}

// Professor API slice
export interface ProfBody {
	university: string;
	professor: string;
	body: Professor;
}

export interface AddProfUni {
	university: string;
	body: {
		professors: string[];
	}
}

export interface DelProfUni {
	university: string;
	body: {
		professor: string;
	}
}

export interface AddProfSub {
	professor: string;
	university: string;
	body: {
		subjects: string[];
	}
}

export interface DelProfSub {
	university: string;
	professor: string;
	body: {
		subject: string;
	}
}

export interface AddProfGrade {
	university: string;
	professor: string;
	body: {
		grades: string[];
	}
}

export interface DelProfGrade {
	university: string;
	professor: string;
	body: {
		grade: string;
	}
}

export interface AddUniProf {
	professor: string;
	university: string;
}

export interface DelUniProf {
	professor: string;
	university: string;
}

export interface GiveSign {
	subject: string;
	university: string;
	body: {
		professor: string;
		students: string[];
	}
}
