import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserRepository } from '@/domain/application/repositories/user.repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository'
import { AuthenticateUserCase } from '@/domain/application/use-cases/authenticate-user'

@Module({
  providers: [
    PrismaService,
    AuthenticateUserCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
