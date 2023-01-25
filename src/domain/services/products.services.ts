import { Product } from '@prisma/client'
import { IProductRepository } from '../repositories/products.repositories'

export interface IProductServices {
  getRandomProduct(): Promise<Product>
}

export class ProductServices implements IProductServices {
  private readonly productsRepo

  constructor(productsRepo: IProductRepository) {
    this.productsRepo = productsRepo
  }
  public async getRandomProduct(): Promise<Product> {
    const randomPercentage = Math.random()
    const probabilityPercentage = 0.5

    const products =
      randomPercentage <= probabilityPercentage
        ? await this.productsRepo.findAllQuality()
        : await this.productsRepo.findAllPoorQuality()

    const randomNumber = Math.floor(Math.random() * products.length)
    const randomProduct = products[randomNumber]

    return randomProduct
  }
}
