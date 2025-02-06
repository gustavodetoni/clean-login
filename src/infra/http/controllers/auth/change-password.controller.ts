import { ChangePasswordUseCase } from '@/domain/application/use-cases/change-password'
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('/change-password')
export class ChangePasswordController {
  constructor(
    private changePasswordUser: ChangePasswordUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() body: any,
    @Res() response,
  ) {
    const result = await this.changePasswordUser.execute({
      email: body.email.toString(),
      newPassword: body.newPassword,
    })

    if (result.isLeft()) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.value.message,
      })
    }

    return {
      sucess: true,
    }
  }
}
