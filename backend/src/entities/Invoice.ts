import type Client from "$server/entities/Client.js";
import type Item from "$server/entities/Item.js";
import {
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

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne("Client", "invoices")
  public client: Client;

  @ManyToOne("Item")
  public item: Item;
}