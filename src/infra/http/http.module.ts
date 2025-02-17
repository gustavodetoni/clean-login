import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SignInController } from './controllers/auth/sign-in.controller'
import { ChangePasswordController } from './controllers/auth/change-password.controller'
import { AuthenticateUserCase } from '@/domain/application/use-cases/authenticate-user'
import { ChangePasswordUseCase } from '@/domain/application/use-cases/change-password'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule
],
  controllers: [
    SignInController,
    ChangePasswordController,
],
  providers: [
    AuthenticateUserCase, 
    ChangePasswordUseCase,
],  
})
export class HttpModule {}
