import type ClientContactDetail from "$server/entities/ClientContactDetail.js";
import type Invoice from "$server/entities/Invoice/Invoice.js";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export default class Client {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", length: 25 })
  public firstName: string;

  @Column({ type: "varchar", length: 25 })
  public lastName: string;

  @Column({ type: "varchar", length: 10 })
  public title: ClientTitle;

  @Column({ type: "varchar", length: 20 })
  public entityType: ClientEntityType;

  @Column({ type: "varchar", length: 25 })
  public prospectiveStatus: ClientProspectiveStatus;

  @OneToOne("ClientContactDetail", "client", {
    cascade: true,
    onDelete: "CASCADE"
  })
  public contactDetail: ClientContactDetail;

  @OneToMany("Invoice", "client")
  public invoices: Invoice[];
}

type ClientTitle = "M." | "Mme" | "autre";
type ClientEntityType = "physique" | "moral";
type ClientProspectiveStatus = "prospect" | "confirmé";