import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class FollowUpVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    patientId!: number
    
    @Column("int", { unique: true })
    doctorId!: number
   
    @Column("date", { unique: true })
    dateOfVisit!: Date

    @Column("varchar", { length: 200 })
    diagnosisStatus!: string
    
    @Column("varchar", { length: 200, nullable: true })
    symptoms!: string
    
    @OneToOne(() => Patient, patient => patient.followUpVisit)
    patient!: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.followUpVisits)
    doctor!: Doctor;

}
