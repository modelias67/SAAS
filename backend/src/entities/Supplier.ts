import type Item from "$server/entities/Item.js";
import type SupplierContactDetail from "$server/entities/SupplierContactDetail.js";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Supplier {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", length: 255 })
  public name: string;

  @OneToOne("SupplierContactDetail", "supplier", {
    cascade: true,
    onDelete: "CASCADE"
  })
  public contactDetail: SupplierContactDetail;

  @OneToMany("Item", "supplier")
  public items: Item[];
}