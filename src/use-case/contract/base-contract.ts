import { Either } from '@/shared/errors/Either'

export interface BaseUseCaseContract<T, K> {
  create: (data: T) => Promise<Either<Error, any>>
  load: () => Promise<Either<Error, K[]>>
}