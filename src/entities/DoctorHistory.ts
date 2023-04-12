import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class DoctorHistory {
  remove: any;
  save() {
    throw new Error("Method not implemented.");
  }

    @Column("date")
    startDate!: Date

    @Column("date")
    endDate!: Date

    @Column("varchar", { length: 200 })
    reasonForLeaving!: string
   
}
