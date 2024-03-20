import { ProfessorDocument } from "models/professor.model";
import { newError } from "utils";

export const addProfessor = async (university: string, professor: ProfessorDocument) => {
    try {
        // let universityObj = await University.findOne({ _id: university });
        // if(!univeristyObj) throw newError()
    } catch (e: any) {
        throw e;
    }
}