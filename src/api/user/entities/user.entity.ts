import { UUID } from 'crypto';
import { DraftModel } from 'src/api/draft/entities/draft.entity';
import { PostModel } from 'src/api/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  userName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  profileImage: string;

  @OneToMany(() => DraftModel, (draft) => draft.user)
  @JoinColumn()
  drafts: DraftModel[];

  @OneToMany(() => PostModel, (post) => post.user)
  @JoinColumn()
  posts: PostModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
