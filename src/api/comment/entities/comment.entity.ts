import { UserModel } from 'src/api/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CommentModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => UserModel, (user) => user.comments, {
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
