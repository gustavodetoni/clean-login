import { Either, left, right } from '@/core/either'
import { NotAllowed } from '@/core/errors/not-allowed'
import { ResourceNotFound } from '@/core/errors/resource-not-found'
import { User } from '@/domain/enterprise/entities/user'
import { UserRepository } from '../repositories/user.repository'

export type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    user: User
  }
>

export class AuthenticateUserCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {

    const user = await this.userRepository.findByEmail(email)

    if (!email) {
      return left(new ResourceNotFound())
    }

    if (!user) {
      return left(new ResourceNotFound())
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return left(new NotAllowed())
    }

    return right({ user })
  }
}
