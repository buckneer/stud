import University from '../models/university.model';
import Service, { ServiceDocument } from '../models/service.model';
import { newError, newResponse } from '../utils';

export const addService = async (university: string, data: ServiceDocument) => {
    let uniObj = await University.findOne({ _id: university });

    if(!uniObj) throw newError(404, 'Greška prilikom dodavanja studentske službe...');

    let newService = new Service ({
        ...data,
        university: uniObj._id
    });

    let added = await newService.save();

    if(!added) throw newError();

    return {
        status: 200,
        message: 'Nalog studentske službe je uspešno kreiran!',
        _id: added._id
    }
}

export const updateService = async (service: string, data: ServiceDocument) => {
    let serviceObj = await Service.findOne({ _id: service });

    if(!serviceObj) throw newError(404, 'Greška prilikom menjanja studentske službe...');

    let updated = await Service.updateOne({ _id: service }, {
        $set: {
            ...data
        }
    });

    if(!updated) throw newError();

    return newResponse('Uspešno menjanje profesora!');
}

export const getServices = async (university: string) => {
    let uniObj = await University.findOne({ _id: university });

    if(!uniObj) throw newError(404, 'Greška prilikom pristupanja studentskim službama...');

    let serviceObj = await Service.find({ university });

    if(!serviceObj) throw newError(404, 'Greška prilikom pristupanja studentskim službama...');

    return serviceObj;
}

export const getService = async (_id: string) => {
    let service = await Service.findOne({_id});

    if(!service) throw newError(404, 'Studentska sluzba nije pronadjena');

    return service;
}

export const getServiceByUserId = async (user: string) => {
    let service = await Service.findOne({user: user});
    if(!service) throw newError(404, 'Studentska sluzba nije pronadjena');

    return service;
}
