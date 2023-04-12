import express from "express";
import dataSource from "./datasource";
import { Patient } from "./entities/Patient";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 *
 */
app.get("/api", (req, res) => {
  // output APIdoc page
  res.end("Hello");
});

// GET - info päring (kõik patsiendid)
app.get("/api/patients", async (req, res) => {
  try {
    // küsi patsiendid andmebaasist
    const patients = await dataSource.getRepository(Patient).find();

    // vasta patsientide kogumikuga JSON formaadis
    return res.status(200).json({ data: patients });
  } catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not fetch patients" });
  }
});

// POST - sends information (saadab infot)
app.post("/api/patients", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // TODO: validate & santize
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ error: "The patient's first and last name are missing" });
    }

    // create new patient with given parameters
    const patient = Patient.create({
      firstName: firstName.trim() ?? "",
      lastName: lastName.trim() ?? "",
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
app.get("/api/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await dataSource
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
app.put("/api/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const patient = await dataSource
      .getRepository(Patient)
      .findOneBy({ id: parseInt(id) });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // uuendame andmed objektis (lokaalne muudatus)
    patient.firstName = firstName ? firstName : patient.firstName;
    patient.lastName = lastName ? lastName : patient.lastName;
    //salvestame muudatused andmebaasi 
    const result = await patient.save();

    // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log("ERROR", { message: error });

    // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
    return res.status(500).json({ message: "Could not update patient data" });
  }
});

// DELETE - kustutamine
app.delete("/api/patients/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName} = req.body;
    
        const patient = await dataSource
          .getRepository(Patient)
          .findOneBy({ id: parseInt(id) });
    
        if (!patient) {
          return res.status(404).json({ error: "Patient not found" });
        }

        const result = await patient.remove();
        
        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
      } catch (error) {
        console.log("ERROR", { message: error });
    
        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update patient data" });
      }
});

export default app;
