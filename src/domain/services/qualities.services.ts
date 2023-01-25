import { Product } from '@prisma/client'

export interface IQualityServices {
  fullReview(product: Product): IFullReview
}

type IFullReview = {
  tests: {
    safety: boolean
    engine: boolean
  }
  passed: boolean
}

export class QualityServices implements IQualityServices {
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

  private verifySafety(product: Product): boolean {
    const haveAirbags = product.safety.includes('Airbags')
    const haveStabilitySystem = product.safety.includes('Stability system')

    return haveAirbags && haveStabilitySystem
  }
  private verifyEngine(product: Product): boolean {
    const haveFourCylinders = +product.engine.split(' ')[0] === 4

    return haveFourCylinders
  }

  public fixSafety(product: Product): Product {
    const safetyParts = ['Airbags', 'Stability system']

    safetyParts.forEach((part) => {
      if (!product.safety.includes(part)) product.safety.push(part)
    })
    return product
  }
  public fixEngine(product: Product): Product {
    const correctEngine = '4 cylinders'

    product.engine = correctEngine

    return product
  }
}
