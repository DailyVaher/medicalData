import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class FollowUpVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("int", { unique: true })
    patientId!: number
    
    @Column("int", { unique: true })
    doctorId!: number
   
    @Column("date")
    dateOfVisit!: Date

    @Column("varchar", { length: 200})
    diagnosisStatus!: string 
    
    @Column("varchar", { length: 200})
    symptoms!: string
    
    @ManyToOne(() => Patient, patient => patient.followUpVisits)
    patient!: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.followUpVisits)
    doctor!: Doctor;

}
