import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/optinal'
import * as bcrypt from 'bcrypt'

export type UserProps = {
  name: string
  email: string
  password: string
  isFirstAccess: boolean
  plan: string
  createdAt: Date
  updatedAt: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get isFirstAccess() {
    return this.props.isFirstAccess
  }

  get plan() {
    return this.props.plan
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static async create(
    props: Optional<UserProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const hashedPassword = await bcrypt.hash(props.password, 10)
    const user = new User(
      {
        ...props,
        password: hashedPassword,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }

  //retirar 
  async changePassword(newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    this.props.password = hashedPassword
    this.props.isFirstAccess = false
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.props.password)
  }
}
