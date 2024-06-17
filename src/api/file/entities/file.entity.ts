import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("file")
export class FileModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  modelName: string;

  @Column({ nullable: true })
  modelId: string;

  @Column({ type: "varchar", length: 255 })
  fileName: string;

  @Column({ type: "varchar", length: 255 })
  mimeType: string;

  @Column({ type: "bigint", unsigned: true })
  size: number;

  @Column({ type: "varchar", length: 5 })
  disk: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  bucket: string;

  @Column({ type: "text", nullable: true })
  path: string;

  @Column({ type: "text", nullable: true })
  url: string;

  @Column({ type: "boolean", default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
