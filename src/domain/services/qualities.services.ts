import { Product } from '@prisma/client'

export class QualityServices implements IQualityServices {
  private verifyEngine(product: Product): boolean {
    const haveFourCylinders = +product.engine.split(' ')[0] === 4

    return haveFourCylinders
  }
  private verifySafety(product: Product): boolean {
    const haveAirbags = product.safety.includes('Airbags')
    const haveStabilitySystem = product.safety.includes('Stability system')

    return haveAirbags && haveStabilitySystem
  }
  private fixEngine(product: Product): Product {
    const correctEngine = '4 cylinders'

    if (this.repairEfficienty()) product.engine = correctEngine

    return product
  }
  private fixSafety(product: Product): Product {
    const safetyParts = ['Airbags', 'Stability system']

    if (this.repairEfficienty()) {
      safetyParts.forEach((part) => {
        if (!product.safety.includes(part)) product.safety.push(part)
      })
    }
    return product
  }
  private repairEfficienty(): boolean {
    return Math.random() < 0.7
  }
  public fullReview(product: Product): IFullReview {
    const safety = this.verifySafety(product)
    const engine = this.verifyEngine(product)

    return {
      tests: {
        safety,
        engine,
      },
      passed: safety && engine,
    }
  }
  public reviewAndFix(product: Product): void {
    if (!this.verifySafety(product)) this.fixSafety(product)
    if (!this.verifyEngine(product)) this.fixEngine(product)
  }
}

export interface IQualityServices {
  fullReview(product: Product): IFullReview
  reviewAndFix(product: Product): void
}
export type IFullReview = {
  tests: {
    safety: boolean
    engine: boolean
  }
  passed: boolean
}
