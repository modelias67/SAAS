import type Client from "$server/entities/Client.js";
import type { ContactDetail } from "$server/types.js";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ClientContactDetail implements ContactDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", length: 255 })
  public street: string;

  @Column({ type: "varchar", length: 50 })
  public city: string;

  @Column({ type: "varchar", length: 10 })
  public postalCode: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  public landlinePhone: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  public cellPhone: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  public email: string | null;

  @OneToOne("Client", "contactDetail")
  @JoinColumn()
  public client: Client;
}