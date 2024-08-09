import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './Controller/auth.controller';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from './Entities/users.entity';
import { LocalStrategy } from './Validators/local.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FeedbackModule } from './modules/feedback.module';
import { JwtStrategy } from './Validators/jwt.strategy';
import { SessionModule } from './modules/session.module';

/**
 * Main application module, integrating various features and configurations.
 */
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../frontend/src/Components/Images'),


    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Zi@d2@@1',
      database: 'lingualinc',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'cSHUl|rArf1SgvR-#zNN*6#DGs/l|/%/_2?4&({Edd:BZ9DQ[l]pDkJmvb$u%}3',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User]),
    FeedbackModule,
    SessionModule,

  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
