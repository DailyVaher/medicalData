import express from 'express';
import defaultDataSource from '../datasource';
import { Patient } from '../entities/Patient';
import { Doctor } from '../entities/Doctor';
import { InsuranceCompany } from '../entities/InsuranceCompany';

const router = express.Router();

interface CreatePatientParams {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    doctorId: number;
    insuranceId: number;
}

interface UpdatePatientParams {
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
    doctorId?: number;
    insuranceId?: number;
}
// get all patients
router.get("/", async (req, res) => {
    try {
        // find all patients from database
        const patients = await defaultDataSource
            .getRepository(Patient)
            .find({relations: ['insuranceCompany', 'doctor']});

        // validate if patients exists
        if (await Patient.count() === 0) {
            return res.status(404).json({error: 'No patients found!'});
        }

        // return patients in JSON format
        return res.status(200).json({data: patients});

    } catch (error) {
        console.log("ERROR", {message: error});

        // return system error if unexpected error occurs during database query
        return res.status(500).json({message: 'Could not fetch patients!'});
    }
});

// find one specific patient
router.get("/:id", async (req, res) => {
    try {
        // get patient id from request parameters
        const {id} = req.params;

        // find patient from database
        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOne({where:{id: parseInt(id)}, relations: ['insuranceCompany', 'doctor']});

        // validate if patient exists
        if (!patient) {
            return res.status(404).json({message: `PatientId: ${id} does not exist!`});
        }

        // return patient in JSON format
        return res.status(200).json({data: patient});

    } catch (error) {
        console.log("ERROR", {message: error});

        // return system error if unexpected error occurs during database query
        return res.status(500).json({message: 'Could not fetch patient!'});
    }
});

// create new patient
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, address, phone, email, doctorId, insuranceId} = req.body as CreatePatientParams;

        // validate & sanitize
        if (!firstName || !lastName || !address || !phone || !email || !doctorId || !insuranceId) {
            return res
                .status(400)
                .json({error: "Patient data is incomplete!"}); 
        }

        // check if insurance exists
        const insurance = await defaultDataSource
            .getRepository(InsuranceCompany)
            .findOne({where: {id: insuranceId}});

        if (!insurance) {
            return res.status(404).json({error: `InsuranceId: ${insuranceId} does not exist!`});
        }

        // check if doctor exists
        const doctor = await defaultDataSource
            .getRepository(Doctor)
            .findOne({where: {id: doctorId}});

        if (!doctor) {
            return res.status(404).json({error: `DoctorId: ${doctorId} does not exist!`});
        }

        // create new patient
        const patient = Patient.create({
            firstName: firstName.trim() ?? "",
            lastName: lastName.trim() ?? "",
            address: address.trim() ?? "",
            phone: phone.trim() ?? "",
            email: email.trim() ?? "",
            doctorId: doctorId ?? "",
            insuranceId: insuranceId ?? ""
        });

        const result = await patient.save();
        
        // return patient in JSON format
        return res.status(200).json({data: result});

    } catch (error) {
        console.log("ERROR", {message: error});

        // return system error if unexpected error occurs during database query
        return res.status(500).json({message: "Could not fetch patient!"});
    }
});

// update one specific patient
router.put("/:id", async (req, res) => {
    try {
        // get patient id from request parameters
        const {id} = req.params;

        // get parameters from request body
        const { firstName, lastName, address, phone, email, doctorId, insuranceId} = req.body as UpdatePatientParams;

        // find patient from database
        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOne({where: {id: parseInt(id)}, relations: ['insuranceCompany', 'doctor']});

        // validate & sanitize
        if (!patient) {
            return res.status(404).json({error: `PatientId: ${id} not found!`});
        }

        if ( !firstName || !lastName || !address || !phone || !email || !doctorId || !insuranceId) {
            return res.status(400).json({error: "Patient data is incomplete!"});
        }

        // update patient
        patient.firstName = firstName ? firstName.trim() : patient.firstName;
        patient.lastName = lastName ? lastName.trim() : patient.lastName;
        patient.address = address ? address.trim() : patient.address;
        patient.phone = phone ? phone.trim() : patient.phone;
        patient.email = email ? email.trim() : patient.email;
        patient.doctorId = doctorId ? doctorId : patient.doctorId;
        patient.insuranceId = insuranceId ? insuranceId : patient.insuranceId;

        // check if insurance exists
        const insurance = await defaultDataSource
            .getRepository(InsuranceCompany)
            .findOne({where: {id: insuranceId}});

        if (!insurance) {
            return res.status(404).json({error: `InsuranceId: ${insuranceId} is not found!`});
        }

        // check if doctor exists
        const doctor = await defaultDataSource
            .getRepository(Doctor)
            .findOne({where: {id: doctorId}});

        if (!doctor) {
            return res.status(404).json({error: `DoctorId: ${doctorId} is not found!`});
        }

        const result = await patient.save();

        // return patient in JSON format
        return res.status(200).json({data: result});

    } catch (error) {
        console.log("ERROR", {message: error});

        // return system error if unexpected error occurs during database query
        return res.status(500).json({message: "Could not update patient!"});
    }
})

// delete specific patient
router.delete("/:id", async (req, res) => {
    try {
        // get patient id from request parameters
        const {id} = req.params;

        // find patient from database
        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOne({where: {id: parseInt(id)}, relations: ['insuranceCompany', 'doctor']});

        // validate
        if (!patient) {
            return res.status(404).json({error: `PatientId: ${id} is not found!`});
        }

        // delete patient
        const result = await Patient.remove(patient);

        // return patient in JSON format
        return res.status(200).json({data: req.params, result});

    } catch (error) {
        console.log("ERROR", {message: error});

        // return system error if unexpected error occurs during database query
        return res.status(500).json({message: "Could not delete patient!"});
    }
});

export default router;