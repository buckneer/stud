import Optional from "../models/optional.model";
import Subject from "../models/subject.model"
import University from "../models/university.model";
import { newError, newResponse } from "../utils";

export const addOptional = async (_id: string, data: any) => {
  let university = await University.findOne({ _id });

  if(!university) throw newError(404, 'Ne postoji univerzitet!');

  if(data?.subjects?.length) {
    let subjectsObj = await Subject.find({ 
      _id: data.subjects, 
      university: _id, 
      department: data.department, 
      degree: data.degree, 
      semester: data.semester,
      type: 'O' 
    });
  
    if(subjectsObj.length !== data.subjects.length) throw newError(400, 'Uneti su nevalidni podaci!');
    
    // let isEveryValid = subjectsObj.every((e: any) => {
    //   return (
    //       e.semester === subjectsObj[0].semester 
    //       && e.department.toString() === subjectsObj[0].department.toString()
    //       && e.department.toString() === data.department
    //       && e.semester === data.semester
    //   )
    // });
  
    // if(!isEveryValid) throw newError(400, 'Greška: uneti su nevalidni podaci!')
  }

  let optional = await Optional.create(data);

  return newResponse('Uspešno ste kreirali izborni blok!', 200, { id: optional._id  });
}

export const getOptional = async (university: string, department: string, semester: string) => {
  return Optional.find({ university, department, semester });
}