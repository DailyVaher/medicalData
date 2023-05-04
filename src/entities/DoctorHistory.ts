import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Doctor } from "./Doctor"
import { Hospital } from "./Hospital"

@Entity()
export class DoctorHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

    @Column("varchar", { length: 100 })
    doctor!: string

    @Column("varchar", { length: 100 })
    hospital!: string

    @Column("date")
    startDate!: Date

    @Column("date")
    endDate!: Date

    @Column("varchar", { length: 200 })
    reasonForLeaving!: string
   
    @OneToMany(() => Doctor, doctor => doctor.doctorHistory)
    doctors!: Doctor[]

    @OneToMany(() => Hospital, hospital => hospital.doctorHistory)
    hospitals!: Hospital[]
    
}
