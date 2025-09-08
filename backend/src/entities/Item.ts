import type Supplier from "$server/entities/Supplier.js";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", length: 100 })
  public shortDesignation: string;

  @Column({ type: "text" })
  public commercialDesignation: string;

  @ManyToOne("Supplier", "items")
  public supplier: Supplier | null;
}