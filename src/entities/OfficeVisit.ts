import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class OfficeVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    patientId!: number
    
    @Column("int", { unique: true })
    doctorId!: number
   
    @Column("date", { unique: true })
    dateOfVisit!: Date
    
    @Column("varchar", { length: 200, nullable: true })
    symptoms!: string

    @OneToOne(() => Patient, patient => patient.officeVisit)
    patient!: Patient;

    @OneToMany(() => Doctor, doctor => doctor.officeVisits)
    doctor!: Doctor;
    
}
