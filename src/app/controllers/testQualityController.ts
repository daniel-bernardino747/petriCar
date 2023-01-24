import { Request, Response } from 'express'
import { PetriNetInitializer } from '../usecases/petriNetInitializer'
import { Product, TestQualityUseCase } from '../usecases/testQualityUseCase'

interface RequestBody {
  product: Product
}

interface ITestQualityController {
  checkProductQuality(req: Request, res: Response): Response
}
const petriNetInitializer = new PetriNetInitializer()
const testQualityUseCase = new TestQualityUseCase(petriNetInitializer.getPetriNet())

export class TestQualityController implements ITestQualityController {
  private petriNetInitializer: PetriNetInitializer
  private testQualityUseCase: TestQualityUseCase

  constructor() {
    this.petriNetInitializer = new PetriNetInitializer()
    this.testQualityUseCase = new TestQualityUseCase(this.petriNetInitializer.getPetriNet())
  }

  public checkProductQuality(req: Request, res: Response) {
    const body: RequestBody = {
      product: {
        name: 'abc',
        weight: 9000,
        height: 212,
        length: 122,
      },
    }

    try {
      const result = this.testQualityUseCase.checkProductQuality(body.product)

      return res.status(200).send({ is: result })
    } catch (error) {
      return res.status(500).send(error)
    }
  }
}
