import type Supplier from "$server/entities/Supplier.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", length: 100 })
  public shortDesignation: string;

  @Column({ type: "text" })
  public commercialDesignation: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne("Supplier", "items", {
    nullable: true,
    onDelete: "SET NULL"
  })
  public supplier: Supplier | null;
}