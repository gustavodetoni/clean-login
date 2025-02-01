import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User } from "@/domain/enterprise/entities/user";
import type { Prisma, User as PrismaUser } from "@prisma/client"

export class PrismaUserMapper {
    static toDomain(raw: PrismaUser) {
        return User.create(
        {
            name: raw.name,
            email: raw.email,
            password: raw.password,
            isFirstAccess: raw.isFirstAccess,
            plan: raw.plan,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt || null
        },
        new UniqueEntityID(raw.id)
        )
    }

    static toPrisma(raw: User): Prisma.UserUncheckedCreateInput {
        return {
            id: raw.id.toString(),
            name: raw.name,
            email: raw.email,
            password: raw.password,
            isFirstAccess: raw.isFirstAccess,
            plan: raw.plan,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt || null
        }
    }
}