import { PostModel } from 'src/api/post/entities/post.entity';
import { UserModel } from 'src/api/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LikeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  isLiked: boolean;

  @Column({ nullable: true })
  @Index()
  userId: string;

  @ManyToOne(() => UserModel, (user) => user.comments, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn()
  user: UserModel;

  @Column({ nullable: true })
  @Index()
  postId: string;

  @ManyToOne(() => PostModel, (post) => post.likes, {
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn()
  post: PostModel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
