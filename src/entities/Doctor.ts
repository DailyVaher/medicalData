import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Patient } from "./Patient";
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
    hospitalAffilitation!: string

    @Column("date")
    dateOfAffilitation!: Date

    @OneToMany(() => Patient, patient => patient.doctor)
    patients!: Patient[]
  doctorHistory: any;

    @OneToMany(() => FollowUpVisit, followUpVisit => followUpVisit.doctor)
    followUpVisits!: FollowUpVisit[]

    @OneToMany(() => InitialVisit, initialVisit => initialVisit.doctor)
    initialVisits!: InitialVisit[]

    @OneToMany(() => OfficeVisit, officeVisit => officeVisit.doctor)
    officeVisits!: OfficeVisit[]

    @OneToMany(() => RoutineVisit, routineVisit => routineVisit.doctor)
    routineVisits!: RoutineVisit[]

}
