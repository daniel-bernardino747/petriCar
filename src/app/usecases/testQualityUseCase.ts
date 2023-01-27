import { Product } from '@prisma/client'
import { IQualityServices } from '@/services'
import { IProductQualityPetri } from '@/petri'

export class TestQualityUseCase implements ITestQualityUseCase {
  private petriNet: IProductQualityPetri
  private qualityServices: IQualityServices

  constructor(
    petriNet: IProductQualityPetri,
    qualityServices: IQualityServices,
  ) {
    this.petriNet = petriNet
    this.qualityServices = qualityServices
  }

  private fixQualityProduct(product: Product): void {
    this.qualityServices.reviewAndFix(product)
  }

  private performQualityCheck(product: Product): boolean {
    const resultTests = this.qualityServices.fullReview(product)

    if (resultTests.passed) return true
    return false
  }

  private startTest(): void {
    this.petriNet.addToken({ name: 'product', tokens: 1 })
  }

  public checkProductQuality(product: Product): boolean {
    const [tTest, tFail, tRedo, tProductCheck, tRemadeProduct] =
      this.petriNet.transitions

    if (tTest.inputPlaces[0].tokens === 0) this.startTest()

    this.petriNet.fireTransition(tTest)

    if (this.performQualityCheck(product)) {
      this.petriNet.fireTransition(tProductCheck)
      return true
    }

    this.petriNet.fireTransition(tFail)
    this.petriNet.fireTransition(tRedo)

    this.fixQualityProduct(product)

    this.petriNet.fireTransition(tRemadeProduct)

    return this.checkProductQuality(product)
  }
}
export interface ITestQualityUseCase {
  checkProductQuality(product: Product): boolean
}
