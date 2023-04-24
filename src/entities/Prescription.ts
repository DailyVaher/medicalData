import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./Drug";
import { Patient } from "./Patient";

@Entity()
export class Prescription extends BaseEntity {
    @PrimaryGeneratedColumn()
    RXid!: number
    
    @Column("int", {unique: true })
    drugId!: number

    @Column("date")
    datePrescribed!: Date
   
    @Column("varchar", { length: 200 })
    dosage!: string

    @Column("varchar", { length: 200 })
    duration!: string

    @Column()
    refillable!: boolean

    @Column("varchar", { length: 200})
    numOfRefills!: string

    @Column("varchar", { length: 200 })
    comments!: string

    @ManyToOne(() => Drug, drug => drug.prescription)
    drug!: Drug

    @OneToOne(() => Patient, patient => patient.prescriptions)
    patient!: Patient;

}
