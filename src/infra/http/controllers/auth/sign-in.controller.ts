import { AuthenticateUserCase } from '@/domain/application/use-cases/authenticate-user'
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'

@Controller('/sign-in')
export class SignInController {
  constructor(
    private authenticateUser: AuthenticateUserCase,
    private jwtService: JwtService,
  ) {}

  @Post()
  async handler(@Body() body: any, @Res() response) {
    const result = await this.authenticateUser.execute({
      email: body.email,
      password: body.password,
    })

    if (result.isLeft()) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized' })
    }

    const { user } = result.value

    const token = this.jwtService.sign({ userId: user.id.toString() })
    const refreshToken = this.jwtService.sign(
      { userId: user.id.toString() },
      { expiresIn: '7d' },
    )

    response.cookie('token', token, { httpOnly: true })
    response.cookie('refreshToken', refreshToken, { httpOnly: true })

    return {
      name: user.name,
      email: user.email,
      isFirstAccess: user.isFirstAccess,
    }
  }
}
