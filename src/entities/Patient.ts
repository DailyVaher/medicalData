import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

// Entity dekoraator @Entity() ütleb TypeORMile, kuidas sellest tabel teha ja millised väljad on olemas

@Entity()
export class Patient {
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

    @Column("varchar", { length: 30 })
    email!: string

    @Column({ type: "int" })
    insuranceId!: number

    @Column("varchar", { length: 200 })
    insuranceOwnerFirstName!: string

    @Column("varchar", { length: 200 })
    insuranceOwnerLastName!: string

    @Column("varchar", { length: 200 })
    insuranceOwnerCompanyName!: string   	
  static create: any;

}
