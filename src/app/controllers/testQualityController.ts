import { ProductRepository } from '@/src/domain/repositories/products.repositories'
import { ProductServices } from '@/src/domain/services/products.services'
import { Request, Response } from 'express'
import { PetriNetInitializer } from '../usecases/petriNetInitializer'
import { TestQualityUseCase } from '../usecases/testQualityUseCase'

interface ITestQualityController {
  checkProductQuality(req: Request, res: Response): Promise<Response>
}

const petriNetInitializer = new PetriNetInitializer()
const testQualityUseCase = new TestQualityUseCase(
  petriNetInitializer.getPetriNet(),
)
const productsRepo = new ProductRepository()
const productsService = new ProductServices(productsRepo)

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
