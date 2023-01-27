import { Product } from '@prisma/client'
import { prisma } from '@/prisma'

export interface IProductRepository {
  findAllQuality(): Promise<Product[]>
  findAllPoorQuality(): Promise<Product[]>
}

export class ProductRepository implements IProductRepository {
  public async findAllPoorQuality() {
    return await prisma.product.findMany({
      where: {
        passed: false,
      },
    })
  }

  public async findAllQuality() {
    return await prisma.product.findMany({
      where: {
        passed: true,
      },
    })
  }
}
