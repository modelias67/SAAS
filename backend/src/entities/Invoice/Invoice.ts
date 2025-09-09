import type Client from "$server/entities/Client.js";
import InvoiceStatus from "$server/entities/Invoice/InvoiceStatus.js";
import type Item from "$server/entities/Item.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export default class Invoice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "enum", enum: InvoiceStatus })
  public status: InvoiceStatus;

  @Column({ type: "timestamptz", nullable: true })
  public technicalVisitDate: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  public installationDate: Date | null;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne("Client", "invoices", {
    nullable: true,
    onDelete: "SET NULL"
  })
  public client: Client | null;

  @ManyToOne("Item", {
    nullable: true,
    onDelete: "SET NULL"
  })
  public item: Item | null;
}