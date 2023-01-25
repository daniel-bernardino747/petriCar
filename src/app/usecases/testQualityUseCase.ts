import { QualityServices } from '@/src/domain/services/qualities.services'
import { ProductQualityPetri } from '@/src/infra/utils/petri'
import { Product } from '@prisma/client'

export class TestQualityUseCase {
  private petriNet: ProductQualityPetri
  private qualityServices: QualityServices

  constructor(petriNet: ProductQualityPetri) {
    this.petriNet = petriNet
    this.qualityServices = new QualityServices()
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

  private performQualityCheck(product: Product): boolean {
    const resultTests = this.qualityServices.fullReview(product)

    if (resultTests.passed) return true
    return false
  }

  private fixQualityProduct(product: Product): void {
    this.qualityServices.reviewAndFix(product)
  }

  private startTest(): void {
    this.petriNet.addToken({ name: 'product', tokens: 1 })
  }
}
