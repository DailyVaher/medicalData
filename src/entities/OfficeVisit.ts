import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class OfficeVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("int", { unique: true })
    patientId!: number
    
    @Column("int", { unique: true })
    doctorId!: number
   
    @Column("date")
    dateOfVisit!: Date

    @Column("varchar", { length: 200})
    diagnosis!: string
    
    @Column("varchar", { length: 200})
    symptoms!: string

    @ManyToOne(() => Patient, patient => patient.officeVisits)
    patient!: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.officeVisits)
    doctor!: Doctor;
    
}
