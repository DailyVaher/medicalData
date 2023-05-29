import express from "express";
import patientsRouter from "./routes/patients.router";
import doctorsRouter from "./routes/doctors.router";
import doctorHistoriesRouter from "./routes/doctorHistories.router";
import drugsRouter from "./routes/drugs.router";
import hospitalsRouter from "./routes/hospitals.router";
import insuranceCompaniesRouter from "./routes/insuranceCompanies.router";
import prescriptionsRouter from "./routes/prescriptions.router";
import visitsRouter from "./routes/visits.router";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  // output APIdoc page
  res.end("Hello");
});

// GET - info päring (kõik artiklid)
app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/doctorHistories", doctorHistoriesRouter);
app.use("/api/drugs", drugsRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/insuranceCompanies", insuranceCompaniesRouter);
app.use("/api/prescriptions", prescriptionsRouter);
app.use("/api/visits", visitsRouter);


export default app;