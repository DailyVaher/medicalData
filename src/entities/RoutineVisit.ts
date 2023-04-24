import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class RoutineVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    patientId!: number
    
    @Column("int", {unique: true })
    doctorId!: number
   
    @Column("date", { unique: true })
    dateOfVisit!: Date

    @Column("int")
    height!: number
    
    @Column("int")
    weight!: number

    @Column("varchar", { length: 200, nullable: true })
    symptoms!: string

    @Column("varchar", { length: 200, nullable: true })
    diagnosis!: string

    @OneToOne(() => Patient, patient => patient.routineVisit)
    patient!: Patient;

    @OneToMany(() => Doctor, doctor => doctor.routineVisits)
    doctor!: Doctor;

}
