import express from 'express';
import { Patient } from '../entities/Patient';
import { Doctor } from '../entities/Doctor';
import defaultDataSource from '../datasource';

const router = express.Router();

interface CreatePatientParams {
    doctorId: number;
    patientId: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    insuranceId: number;
    insuranceOwnerFirstName: string;
    insuranceOwnerLastName: string;
    insuranceOwnerCompanyName: string;
}

interface UpdatePatientParams {
    doctorId?: number;
    patientId?: number;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    email?: string;
    insuranceId?: number;
    insuranceOwnerFirstName?: string;
    insuranceOwnerLastName?: string;
    insuranceOwnerCompanyName?: string;
}
// GET - info päring (kõik patsiendid)
router.get("/", async (req, res) => {
    try {
      // küsi patsiendid andmebaasist
      const patients = await defaultDataSource.getRepository(Patient).find();
  
      // vast JSON formaadis patsientide listiga
      return res.status(200).json({ data: patients });
    } catch (error) {
      console.log("ERROR", { message: error });
  
      // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
      return res.status(500).json({ message: "Could not fetch patients" });
    }
});
  
  
// POST - saadab infot
router.post("/", async (req, res) => {
try {
    const { firstName, lastName, address, phone, email, insuranceId, insuranceOwnerFirstName, insuranceOwnerLastName, insuranceOwnerCompanyName, doctorId} = req.body as CreatePatientParams;

    // TODO: validate & santize
    if (!firstName || !lastName || !address || !phone || !email || !insuranceId || !insuranceOwnerFirstName || !insuranceOwnerLastName || !insuranceOwnerCompanyName || !doctorId) {
    return res
        .status(400)
        .json({ error: "Patient data is not complete" });
    }

    // NOTE: võib tekkida probleeme kui ID väljale kaasa anda "undefined" väärtus
    // otsime üles patsiendiga seotud arsti
    const doctor = await Doctor.findOneBy({id: doctorId});

    if(!doctor) {
    return res.status(400).json({ message: "Doctor with given ID not found" });
    }

    // create new patient with given parameters
    const patient = Patient.create({
    firstName: firstName.trim() ?? "",
    lastName: lastName.trim() ?? "",    
    address: address.trim() ?? "",
    phone: phone.trim() ?? "",
    email: email.trim() ?? "",
    insuranceId: insuranceId ?? "",
    insuranceOwnerFirstName: insuranceOwnerFirstName.trim() ?? "",
    insuranceOwnerLastName: insuranceOwnerLastName.trim() ?? "",
    insuranceOwnerCompanyName: insuranceOwnerCompanyName.trim() ?? "",
    });

    //save patient to database
    const result = await patient.save();

    return res.status(200).json({ data: result });
} catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not fetch patients" });
}
});

// GET - info päring (üksik patsient)
router.get("/:id", async (req, res) => {
try {
    const { id } = req.params;

    const patient = await defaultDataSource
    .getRepository(Patient)
    .findOneBy({ id: parseInt(id) });

    return res.status(200).json({ data: patient });
} catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not fetch patients" });
}
});

// PUT - update
router.put("/:id", async (req, res) => {
try {
    const { id } = req.params;
    const { firstName, lastName, address, phone, email, insuranceId, insuranceOwnerFirstName, insuranceOwnerLastName,insuranceOwnerCompanyName, doctorId } = req.body as UpdatePatientParams;

    const patient = await defaultDataSource
    .getRepository(Patient)
    .findOneBy({ id: parseInt(id) });

    if (!patient) {
    return res.status(404).json({ error: "Article not found" });
    }


    // uuendame andmed objektis (lokaalne muudatus)
    patient.firstName = firstName ? firstName : patient.firstName;
    patient.lastName = lastName ? lastName : patient.lastName;
    patient.address = address ? address : patient.address;
    patient.phone = phone ? phone : patient.phone;
    patient.email = email ? email : patient.email;
    patient.insuranceId = insuranceId ? insuranceId : patient.insuranceId;
    patient.insuranceOwnerFirstName = insuranceOwnerFirstName ? insuranceOwnerFirstName : patient.insuranceOwnerFirstName;
    patient.insuranceOwnerLastName = insuranceOwnerLastName ? insuranceOwnerLastName : patient.insuranceOwnerLastName;
    patient.insuranceOwnerCompanyName = insuranceOwnerCompanyName ? insuranceOwnerCompanyName : patient.insuranceOwnerCompanyName;

  
    // otsime üles millise arstiga on patsient seotud
    if(doctorId){
    const doctor = await Doctor.findOneBy({id: doctorId});
    if(!doctor){
        return res.status(400).json({ message: "Doctor with given ID not found" });
    }
    patient.doctorId = doctor.id;
    }
    
    //salvestame muudatused andmebaasi 
    const result = await patient.save();

    // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
    return res.status(200).json({ data: result });
} catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not update patient" });
}
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
    
        const patient = await defaultDataSource
        .getRepository(Patient)
        .findOneBy({ id: parseInt(id) });
    
        if (!patient) {
        return res.status(404).json({ error: "Patient could not found" });
        }

        const result = await patient.remove();
        
        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });
    
        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update patient" });
    }
});

export default router;