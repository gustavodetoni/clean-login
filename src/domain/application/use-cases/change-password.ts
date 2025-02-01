import { Either, left, right } from '@/core/either'
import { NotAllowed } from '@/core/errors/not-allowed'
import { ResourceNotFound } from '@/core/errors/resource-not-found'
import { User } from '@/domain/enterprise/entities/user'
import { UserRepository } from '../repositories/user.repository'

export type ChangePasswordRequest = {
  email: string
  newPassword: string
}

export type ChangePasswordResponse = Either<
  ResourceNotFound | NotAllowed,
  { user: User }
>

export class ChangePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    newPassword,
  }: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFound())
    }

    if (!user.isFirstAccess) {
      return left(new NotAllowed())
    }

    await user.changePassword(newPassword)

    await this.userRepository.save(user)

    return right({ user })
  }
}
