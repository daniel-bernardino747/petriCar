import { prisma } from '@/src/prisma/prisma.client'
import { Product } from '@prisma/client'

export interface IProductRepository {
  findAllQuality(): Promise<Product[]>
  findAllPoorQuality(): Promise<Product[]>
}

export class ProductRepository implements IProductRepository {
  public async findAllQuality() {
    return await prisma.product.findMany({
      where: {
        passed: true,
      },
    })
  }
  public async findAllPoorQuality() {
    return await prisma.product.findMany({
      where: {
        passed: false,
      },
    })
  }
}
