import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Doctor } from "./Doctor";
import { DoctorHistory } from "./DoctorHistory";

@Entity()
export class Hospital extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column("varchar", { length: 50 })
    name!: string
   
    @Column("varchar", { length: 200 })
    address!: string
    
    @Column("varchar", { length: 50 })
    phone!: string

    @ManyToMany(() => Doctor, doctor => doctor.hospitals)
    doctors!: Doctor[];

    @ManyToOne(() => DoctorHistory, doctorHistory => doctorHistory.hospitals)
    doctorHistory!: DoctorHistory;
    
}
