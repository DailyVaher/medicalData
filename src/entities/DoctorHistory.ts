import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Doctor } from "./Doctor"

@Entity()
export class DoctorHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

    @Column("date")
    startDate!: Date

    @Column("date")
    endDate!: Date

    @Column("varchar", { length: 200 })
    reasonForLeaving!: string
   
    @OneToMany(() => Doctor, doctor => doctor.doctorHistory)
    doctors!: Doctor[]
    
}
