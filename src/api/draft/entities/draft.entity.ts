import { UserModel } from "src/api/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class DraftModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  image: string;

  @Column("decimal", { nullable: true, precision: 6, scale: 2 })
  latitude: number;

  @Column("decimal", { nullable: true, precision: 6, scale: 2 })
  longtitude: number;

  @Column({ nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => UserModel, (user) => user.drafts, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn()
  user: UserModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
