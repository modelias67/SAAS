import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1757491978758 implements MigrationInterface {
  name = 'Migrations1757491978758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "firstName" character varying(25) NOT NULL, "lastName" character varying(25) NOT NULL, "title" character varying(10) NOT NULL, "entityType" character varying(20) NOT NULL, "prospectiveStatus" character varying(25) NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "client_contact_detail" ("id" SERIAL NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(50) NOT NULL, "postalCode" character varying(10) NOT NULL, "landlinePhone" character varying(20), "cellPhone" character varying(20), "email" character varying(255), "clientId" integer, CONSTRAINT "REL_9ee3073487096aa5ba62532d0e" UNIQUE ("clientId"), CONSTRAINT "PK_928c4639db1709b30178a1a7424" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "public"."invoice_status_enum" AS ENUM('estimate', 'invoice')`);
    await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "status" "public"."invoice_status_enum" NOT NULL, "technicalVisitDate" TIMESTAMP WITH TIME ZONE, "installationDate" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, "itemId" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "item" ("id" SERIAL NOT NULL, "shortDesignation" character varying(100) NOT NULL, "commercialDesignation" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierId" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "supplier_contact_detail" ("id" SERIAL NOT NULL, "street" character varying(255) NOT NULL, "city" character varying(50) NOT NULL, "postalCode" character varying(10) NOT NULL, "landlinePhone" character varying(20), "cellPhone" character varying(20), "email" character varying(255), "supplierId" integer, CONSTRAINT "REL_d9c7ac7fdb6efda54ea1b14514" UNIQUE ("supplierId"), CONSTRAINT "PK_a597da970b449ed3ad6c24dadc0" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "client_contact_detail" ADD CONSTRAINT "FK_9ee3073487096aa5ba62532d0ec" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_f18e9b95fe80b1f554d1cb6c23b" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_79e1e7fa956f3a69beb384aa14a" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_e7c44eae41483213a380f4c57c5" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "supplier_contact_detail" ADD CONSTRAINT "FK_d9c7ac7fdb6efda54ea1b145146" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "supplier_contact_detail" DROP CONSTRAINT "FK_d9c7ac7fdb6efda54ea1b145146"`);
    await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_e7c44eae41483213a380f4c57c5"`);
    await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_79e1e7fa956f3a69beb384aa14a"`);
    await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_f18e9b95fe80b1f554d1cb6c23b"`);
    await queryRunner.query(`ALTER TABLE "client_contact_detail" DROP CONSTRAINT "FK_9ee3073487096aa5ba62532d0ec"`);
    await queryRunner.query(`DROP TABLE "supplier_contact_detail"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TYPE "public"."invoice_status_enum"`);
    await queryRunner.query(`DROP TABLE "client_contact_detail"`);
    await queryRunner.query(`DROP TABLE "client"`);
  }

}
