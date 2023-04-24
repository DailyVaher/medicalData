import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class InitialVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    patientId!: number
    
    @Column("int", {unique: true })
    doctorId!: number
   
    @Column("date", { unique: true })
    dateOfVisit!: Date

    @Column("varchar", { length: 200 })
    initialDiagnosis!: string
    
    @Column("varchar", { length: 200, nullable: true })
    symptoms!: string
    
    @OneToOne(() => Patient, patient => patient.initialVisit)
    patient!: Patient;

    @OneToMany(() => Doctor, doctor => doctor.initialVisits)
    doctor!: Doctor;

}
