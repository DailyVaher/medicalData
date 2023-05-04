import express from 'express';
import defaultDataSource from '../datasource';
import { Doctor } from '../entities/Doctor';




const router = express.Router();

interface CreateDoctorParams {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    specialization: string;
    hospitalId: number;
    hospitalAffilitation: string;
    dateOfAffilitation: Date;
}

interface UpdateDoctorParams {
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
    specialization?: string;
    hospitalId?: number;
    hospitalAffilitation?: string;
    dateOfAffilitation?: Date;
}
  
// GET - info päring (kõik arstid)
router.get("/", async (req, res) => {
    try {
      // küsi arstid andmebaasist
      const doctors = await defaultDataSource.getRepository(Doctor).find();
  
      // vasta arstide listiga JSON formaadis
      return res.status(200).json({ data: doctors });
    } catch (error) {
      console.log("ERROR", { message: error });
  
      // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
      return res.status(500).json({ message: "Could not fetch Doctors" });
    }
});
  
  
// POST - saadab infot
router.post("/", async (req, res) => {
try {
    const { firstName, lastName, address, phone, specialization, hospitalId, hospitalAffilitation, dateOfAffilitation } = req.body as CreateDoctorParams;

    // TODO: validate & santize
    if (!firstName || !lastName || !address || !phone || !specialization || !hospitalId || !hospitalAffilitation || !dateOfAffilitation) {
    return res
        .status(400)
        .json({ error: "Complete doctors data", req: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
        specialization: specialization,
        hospitalId: hospitalId,
        hospitalAffilitation: hospitalAffilitation,
        dateOfAffilitation: dateOfAffilitation,
        }});
    }


    // create new Doctor with given parameters
    const doctor = Doctor.create({
    firstName: firstName.trim() ?? "",
    lastName: lastName.trim() ?? "",
    address: address.trim() ?? "",
    phone: phone.trim() ?? "",
    specialization: specialization.trim() ?? "",
    hospitalId: hospitalId ?? "",
    hospitalAffilitation: hospitalAffilitation.trim() ?? "",
    dateOfAffilitation: dateOfAffilitation ?? "",
    });


    //save doctor to database
    const result = await doctor.save();

    return res.status(200).json({ data: result });
} catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not fetch doctors" });
}
});

// GET - info päring (üksik arst)
router.get("/:id", async (req, res) => {
try {
    const { id } = req.params;

    // tavaline ORM päring koos "relation" entity sisuga
    const doctor = await defaultDataSource
    .getRepository(Doctor)
    .findOne({ where:{id: parseInt(id)}, relations: ['patients'] });


    return res.status(200).json({ data: doctor });
} catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not fetch Doctors" });
}
});

// PUT - update
router.put("/:id", async (req, res) => {
try {
    const { id } = req.params;
    const { firstName, lastName, address, phone, specialization, hospitalId, hospitalAffilitation, dateOfAffilitation } = req.body as UpdateDoctorParams;

    const doctor = await defaultDataSource
    .getRepository(Doctor)
    .findOneBy({ id: parseInt(id) });

    if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
    }

    // uuendame andmed objektis (lokaalne muudatus)
    doctor.firstName = firstName ? firstName : doctor.firstName;
    doctor.lastName = lastName ? lastName : doctor.lastName;
    doctor.address = address ? address : doctor.address;
    doctor.phone = phone ? phone : doctor.phone;
    doctor.specialization = specialization ? specialization : doctor.specialization;
    doctor.hospitalId = hospitalId ? hospitalId : doctor.hospitalId;
    doctor.hospitalAffilitation = hospitalAffilitation ? hospitalAffilitation : doctor.hospitalAffilitation;
    doctor.dateOfAffilitation = dateOfAffilitation ? dateOfAffilitation : doctor.dateOfAffilitation;

    //salvestame muudatused andmebaasi 
    const result = await doctor.save();

    // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
    return res.status(200).json({ data: result });
}    catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not update Doctors " });
}
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
    
        const doctor = await defaultDataSource
        .getRepository(Doctor)
        .findOneBy({ id: parseInt(id) });
    
        if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
        }

        const result = await doctor.remove();
        
        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });
    
        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update Doctors" });
    }
});

export default router;