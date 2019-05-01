import { IsNotEmpty } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["toAddress", "fromAddress"])
export default class TxnHistory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @Column({ type: "varchar" })
  @IsNotEmpty()
  public toAddress: string;

  @Index()
  @Column({ type: "varchar" })
  @IsNotEmpty()
  public fromAddress: string;

  @Column({ type: "varchar" })
  @IsNotEmpty()
  public txnhash: string;

  @Index()
  @Column({ type: "varchar" })
  @IsNotEmpty()
  public status: string;

  @Column({ type: "decimal" })
  @IsNotEmpty()
  public tokenCount: number;
}
