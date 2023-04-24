import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

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
    
}
