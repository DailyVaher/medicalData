import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Doctor {
  remove: any;
  save() {
    throw new Error("Method not implemented.");
  }

    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar", { length: 50 })
    firstName!: string

    @Column("varchar", { length: 50 })
    lastName!: string

    @Column("varchar", { length: 200 })
    address!: string

    @Column("varchar", { length: 20 })
    phone!: string

    @Column("varchar", { length: 200 })
    specialization!: string

    @Column("varchar", { length: 50 })
    hospitalAffilitation!: string
    
}
