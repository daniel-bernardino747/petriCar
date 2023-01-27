import { Request, Response } from 'express'

import {
  IPetriNetInitializer,
  ITestQualityUseCase,
  PetriNetInitializer,
  TestQualityUseCase,
} from '@/usecases'
import {
  IProductServices,
  IQualityServices,
  ProductServices,
  QualityServices,
} from '@/services'
import { IProductRepository, ProductRepository } from '@/repositories'
import { IProductQualityPetri, ProductQualityPetri } from '@/petri'

import httpStatus from 'http-status'

export class TestQualityController implements ITestQualityController {
  petriNetInitializer: IPetriNetInitializer
  productQualityPetri: IProductQualityPetri
  testQualityUseCase: ITestQualityUseCase
  productsService: IProductServices
  qualityServices: IQualityServices
  productsRepo: IProductRepository

  constructor() {
    this.productQualityPetri = new ProductQualityPetri()
    this.petriNetInitializer = new PetriNetInitializer(this.productQualityPetri)
    this.productsRepo = new ProductRepository()
    this.productsService = new ProductServices(this.productsRepo)
    this.qualityServices = new QualityServices()
    this.testQualityUseCase = new TestQualityUseCase(
      this.petriNetInitializer.getPetriNet(),
      this.qualityServices,
    )
  }

  public checkProductQuality = async (_req: Request, res: Response) => {
    const product = await this.productsService.getRandomProduct()
    const result = this.testQualityUseCase.checkProductQuality(product)

    return res.status(httpStatus.OK).send({ is: result })
  }
}
export interface ITestQualityController {
  checkProductQuality(req: Request, res: Response): Promise<Response>
}
