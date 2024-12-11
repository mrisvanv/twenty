import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupCoreTables implements MigrationInterface {
  name = 'SetupCSTables1733813252000';

  //   -- Add PMS (Project Management System) related columns to workspace table
  // ALTER TABLE core.workspace
  // ADD COLUMN "pmsAccountKey" character varying COLLATE pg_catalog."default",
  // ADD COLUMN "pmsAccountId" character varying COLLATE pg_catalog."default",
  // ADD COLUMN "pmsUrl" character varying COLLATE pg_catalog."default";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" ADD COLUMN "pmsAccountKey" character varying COLLATE pg_catalog."default"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" ADD COLUMN "pmsAccountId" character varying COLLATE pg_catalog."default"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" ADD COLUMN "pmsUrl" character varying COLLATE pg_catalog."default"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" DROP COLUMN "pmsAccountKey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" DROP COLUMN "pmsAccountId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" DROP COLUMN "pmsUrl"`,
    );
  }
}
