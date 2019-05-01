import { MigrationInterface, QueryRunner } from "typeorm";

export class TxnHistory1556112953834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "txn_history" ("id" SERIAL NOT NULL, "toAddress" character varying NOT NULL, "fromAddress" character varying NOT NULL, "txnhash" character varying NOT NULL, "status" character varying NOT NULL, "tokenCount" numeric NOT NULL, CONSTRAINT "PK_a312ba7c1a34b0ea7d83d420ad6" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_a2f9ce6cd53403d3c5aa2f3caa" ON "txn_history" ("toAddress") `);
    await queryRunner.query(`CREATE INDEX "IDX_466ee293c84eec9e972532b140" ON "txn_history" ("fromAddress") `);
    await queryRunner.query(`CREATE INDEX "IDX_d9a58c9fea038e6a2c12df7fb4" ON "txn_history" ("status") `);
    await queryRunner.query(`CREATE INDEX "IDX_27cd37d6b02a9ba09843598da4" ON "txn_history" ("toAddress", "fromAddress") `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_27cd37d6b02a9ba09843598da4"`);
    await queryRunner.query(`DROP INDEX "IDX_d9a58c9fea038e6a2c12df7fb4"`);
    await queryRunner.query(`DROP INDEX "IDX_466ee293c84eec9e972532b140"`);
    await queryRunner.query(`DROP INDEX "IDX_a2f9ce6cd53403d3c5aa2f3caa"`);
    await queryRunner.query(`DROP TABLE "txn_history"`);
  }
}
