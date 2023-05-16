import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20 })
  first_name: string;

  @Column("varchar", { length: 20 })
  last_name: string;

  @Column({ type: "date" })
  birthday: Date;

  @Column("varchar", { length: 50, unique: true })
  email: string;

  @Column("varchar", { length: 255 })
  password: string;

  @Column("varchar", { length: 11, unique: true })
  phone: string;

  @Column("varchar", { length: 11, unique: true })
  document: string;

  @Column({ type: "tinyint", default: 0 })
  forgotPassword: number;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  createdAt: Date;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  updatedAt: Date;
}
