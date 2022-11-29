import { ProductEntity } from '@/domain/entities'
import { Either } from '@/shared/errors/Either'
import { ProducCreatetModel } from '@/use-case/model'
import { ProductCreateServiceError, ProductLoadServiceError } from '../error'

export interface ProductServiceContract {
  create: (data: ProductEntity) => Promise<Either<ProductCreateServiceError, ProducCreatetModel>>
  load: () => Promise<Either<ProductLoadServiceError, ProducCreatetModel[]>>
  loadById: (id: number) => Promise<Either<ProductLoadServiceError, ProducCreatetModel | null>>
}