import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class InitialVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("int", {unique: true })
    patientId!: number
    
    @Column("int", {unique: true })
    doctorId!: number
   
    @Column("date")
    dateOfVisit!: Date

    @Column("varchar", { length: 200})
    initialDiagnosis!: string
    
    @Column("varchar", { length: 200})
    symptoms!: string
    
    @ManyToOne(() => Patient, patient => patient.initialVisits)
    patient!: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.initialVisits)
    doctor!: Doctor;

}
