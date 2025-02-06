import { UserRepository } from '@/domain/application/repositories/user.repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user.repository'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
