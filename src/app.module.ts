import { CommentModule } from './api/comment/comment.module';
import { DraftModule } from './api/draft/draft.module';
import { DraftController } from './api/draft/draft.controller';
import { PostModule } from './api/post/post.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AuthModule } from './api/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './api/user/user.module';
import { FileModule } from './api/file/file.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    CommentModule,
    DraftModule,
    PostModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    JwtModule,
    UserModule,
    FileModule,
  ],
  controllers: [DraftController, AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
