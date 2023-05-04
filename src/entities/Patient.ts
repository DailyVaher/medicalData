import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn, DeepPartial } from "typeorm";
import { Doctor } from "./Doctor";
import { InsuranceCompany } from "./InsuranceCompany";
import { Prescription } from "./Prescription";
import { OfficeVisit } from "./OfficeVisit";
import { InitialVisit } from "./InitialVisit";
import { FollowUpVisit } from "./FollowUpVisit";
import { RoutineVisit } from "./RoutineVisit";



// Entity dekoraator @Entity() ütleb TypeORMile, kuidas sellest tabel teha ja millised väljad on olemas

@Entity()
export class Patient extends BaseEntity {
  
    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 100 })
    firstName!: string

    @Column("varchar", { length: 100 })
    lastName!: string

    @Column("varchar", { length: 200 })
    address!: string

    @Column("varchar", { length: 50 })
    phone!: string

    @Column("varchar", { length: 50 })
    email!: string

    @Column("int", {nullable: true})
    insuranceId!: string

    @Column("varchar", { length: 200, nullable: true })
    prescription!: string

    @Column("varchar", { length: 200, nullable: true })
    insuranceOwnerFirstName!: string

    @Column("varchar", { length: 200, nullable: true })
    insuranceOwnerLastName!: string

    @Column("varchar", { length: 200, nullable: true })
    insuranceOwnerCompanyName!: string   	

    @Column("int", { unique: true })
    doctorId!: number


  @ManyToOne(() => Doctor, doctor => doctor.patients, {eager:true})
  doctor!: Doctor

  @ManyToOne(() => InsuranceCompany, insuranceCompany => insuranceCompany.patients)
  insuranceCompany!: InsuranceCompany

  @OneToMany(() => Prescription, prescription => prescription.patient)
  prescriptions!: Prescription[];

  @OneToMany(() => OfficeVisit, officeVisit => officeVisit.patient)
  officeVisits!: OfficeVisit[];

  @OneToMany(() => InitialVisit, initialVisit => initialVisit.patient)
  initialVisits!: InitialVisit[];

  @OneToMany(() => FollowUpVisit, followUpVisit => followUpVisit.patient)
  followUpVisits!: FollowUpVisit[];

  @OneToMany(() => RoutineVisit, routineVisit => routineVisit.patient)
  routineVisits!: RoutineVisit[];

}

