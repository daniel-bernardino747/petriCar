import { ProductRepository } from '@/src/domain/repositories/products.repositories'
import { ProductServices } from '@/src/domain/services/products.services'
import { Request, Response } from 'express'
import { PetriNetInitializer } from '../usecases/petriNetInitializer'
import { TestQualityUseCase } from '../usecases/testQualityUseCase'

export class TestQualityController implements ts.ITestQualityController {
  petriNetInitializer: ts.IPetriNetInitializer
  productQualityPetri: ts.IProductQualityPetri
  testQualityUseCase: ts.ITestQualityUseCase
  productsService: ts.IProductServices
  qualityServices: ts.IQualityServices
  productsRepo: ts.IProductRepository

  constructor() {
    this.productQualityPetri = new ts.ProductQualityPetri()
    this.petriNetInitializer = new ts.PetriNetInitializer(
      this.productQualityPetri,
    )
    this.productsRepo = new ts.ProductRepository()
    this.productsService = new ts.ProductServices(this.productsRepo)
    this.qualityServices = new ts.QualityServices()
    this.testQualityUseCase = new ts.TestQualityUseCase(
      this.petriNetInitializer.getPetriNet(),
      this.qualityServices,
    )
  }

export class TestQualityController implements ITestQualityController {
  public async checkProductQuality(req: Request, res: Response) {
    try {
      const product = await productsService.getRandomProduct()
      const result = testQualityUseCase.checkProductQuality(product)

      return res.status(200).send({ is: result })
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
