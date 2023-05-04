import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from "typeorm"
import { Patient } from "./Patient";
import { Prescription } from "./Prescription";
import { Hospital } from "./Hospital";
import { DoctorHistory } from "./DoctorHistory";
import { FollowUpVisit } from "./FollowUpVisit";
import { InitialVisit } from "./InitialVisit";
import { OfficeVisit } from "./OfficeVisit";
import { RoutineVisit } from "./RoutineVisit";

@Entity()
export class Doctor extends BaseEntity{
 
    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 100 })
    firstName!: string

    @Column("varchar", { length: 100 })
    lastName!: string

    @Column("varchar", { length: 200 })
    address!: string

    @Column("varchar", { length: 100 })
    phone!: string

    @Column("varchar", { length: 200 })
    specialization!: string

    @Column("varchar", { length: 100 })
    hospital!: string

    @Column("varchar", { length: 100 })
    hospitalAffilitation!: string

    @Column("date")
    dateOfAffilitation!: Date

    @Column("varchar", { length: 100 })
    prescription!: string

    @OneToMany(() => Patient, patient => patient.doctor)
    patients!: Patient[]

    @OneToMany(() => Prescription, prescription => prescription.doctor)
    prescriptions!: Prescription[]

    @OneToMany(() => Hospital, hospital => hospital.doctors)
    hospitals!: Hospital[]
  
    @OneToOne(() => DoctorHistory, doctorHistory => doctorHistory.doctor)
    doctorHistory!: DoctorHistory

    @OneToMany(() => FollowUpVisit, followUpVisit => followUpVisit.doctor)
    followUpVisits!: FollowUpVisit[]

    @OneToMany(() => InitialVisit, initialVisit => initialVisit.doctor)
    initialVisits!: InitialVisit[]

    @OneToMany(() => OfficeVisit, officeVisit => officeVisit.doctor)
    officeVisits!: OfficeVisit[]

    @OneToMany(() => RoutineVisit, routineVisit => routineVisit.doctor)
    routineVisits!: RoutineVisit[]

}
