import { LikeModel } from 'src/api/like/entities/like.entity';
import { UserModel } from 'src/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column('decimal', { nullable: true, precision: 6, scale: 2 })
  latitude: number;

  @Column('decimal', { nullable: true, precision: 6, scale: 2 })
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

  @OneToMany(() => LikeModel, (likes) => likes.post)
  @JoinColumn()
  likes: LikeModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
