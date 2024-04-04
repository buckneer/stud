import Optional from "../models/optional.model";
import Subject from "../models/subject.model"
import { newError, newResponse } from "../utils";

export const addOptional = async (data: any) => {
  let subjectsObj = await Subject.find({ _id: data.subjects, university: data.university, type: 'O' });

  if(subjectsObj.length !== data.subjects.length) throw newError(400, 'Ne postoji jedan od predmeta!');
  
  let isEveryValid = subjectsObj.every((e: any) => {
    return (
        e.semester === subjectsObj[0].semester 
        && e.department.toString() === subjectsObj[0].department.toString()
        && e.department.toString() === data.department
        && e.semester === data.semester
    )
  });

  if(!isEveryValid) throw newError(400, 'Greška: uneti su nevalidni podaci!')

  let optional = await Optional.create(data);

  return newResponse('Uspešno ste kreirali izborni blok!', 200, { id: optional._id  });
}

export const getOptional = async (university: string, department: string, semester: string) => {
  return Optional.find({ university, department, semester });
}