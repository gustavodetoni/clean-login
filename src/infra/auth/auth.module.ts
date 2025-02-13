import { UserRepository } from '@/domain/application/repositories/user.repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user.repository'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { AuthenticateUserCase } from '@/domain/application/use-cases/authenticate-user'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    DatabaseModule
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    AuthenticateUserCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [JwtModule]
})
export class AuthModule {}
