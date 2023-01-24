import { ProductQualityPetri } from '@/src/infra/utils/petri'

export interface Product {
  name: string
  weight: number
  height: number
  length: number
}

export class TestQualityUseCase {
  private petriNet: ProductQualityPetri

  constructor(petriNet: ProductQualityPetri) {
    this.petriNet = petriNet
  }

  public checkProductQuality(product: Product): boolean {
    const [tTest, tFail, tRedo, tProductCheck] = this.petriNet.transitions

    this.petriNet.fireTransition(tTest)

    if (this.performQualityCheck(product)) {
      this.petriNet.fireTransition(tProductCheck)

      return true
    } else {
      this.petriNet.fireTransition(tFail)

      if (product.name.includes('.')) return false
      product.name = product.name + ' .'

      this.petriNet.fireTransition(tRedo)
      return this.checkProductQuality(product)
    }
  }

  private performQualityCheck(product: Product): boolean {
    const validWeight = product.weight < 10000 && product.weight > 7000 // ml
    const validHeight = product.height < 218 && product.height > 209 // mm
    const validLenght = product.length < 128 && product.height > 119 // mm

    const isPassed = validWeight && validHeight && validLenght

    return isPassed ? true : false
  }
}
