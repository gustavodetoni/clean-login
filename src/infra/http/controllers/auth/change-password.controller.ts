import { ChangePasswordUseCase } from '@/domain/application/use-cases/change-password'
import { User } from '@/domain/enterprise/entities/user'
import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Controller('/change-password')
export class ChangePasswordController {
  constructor(
    private changePasswordUser: ChangePasswordUseCase,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @GetUser() user: User,
    @Body() body: any,
    @Res() response,
  ) {
    const result = await this.changePasswordUser.execute({
      email: user.email.toString(),
      newPassword: body.newPassword,
    })

    if (result.isLeft()) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.value.message,
      })
    }

    return {
        sucess: true
    }
  }
}
