export interface Meta {
	university?: string;
	tab?: string;
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
	currentSemester?: string;
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
	university?: string;
	espb?: number;
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
	department: string;
	body: {
		students: string[];
	}
}

export interface DelStDep {
	department: string;
	body: {
		student: string;
	}
}

export interface AddProfDep {
	department: string;
	body: {
		professors: string[];
	}
}

export interface DelProfDep {
	department: string;
	body: {
		professor: string;
	}
}

export interface AddSubDep {
	department: string;
	body: {
		subjects: string[];
	}
}

export interface DelSubDep {
	department: string;
	body: {
		subject: string;
	}
}

// Professor API slice
export interface ProfBody {
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
	body: {
		subjects: string[];
	}
}

export interface DelProfSub {
	professor: string;
	body: {
		subject: string;
	}
}

export interface AddProfGrade {
	professor: string;
	body: {
		grades: string[];
	}
}

export interface DelProfGrade {
	professor: string;
	body: {
		grade: string;
	}
}

export interface AddUniProf {
	professor: string;
	body: {
		universities: string[];
	}
}

export interface DelUniProf {
	professor: string;
	body: {
		university: string;
	}
}

export interface GiveSign {
	subject: string;
	body: {
		professor: string;
		students: string[];
	}
}
