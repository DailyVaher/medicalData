import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class RoutineVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("int", {unique: true })
    patientId!: number
    
    @Column("int", {unique: true })
    doctorId!: number
   
    @Column("date")
    dateOfVisit!: Date

    @Column("int")
    height!: number
    
    @Column("int")
    weight!: number

    @Column("varchar", { length: 200, nullable: true })
    symptoms!: string

    @Column("varchar", { length: 200, nullable: true })
    diagnosis!: string

    @ManyToOne(() => Patient, patient => patient.routineVisits)
    patient!: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.routineVisits)
    doctor!: Doctor;

}
