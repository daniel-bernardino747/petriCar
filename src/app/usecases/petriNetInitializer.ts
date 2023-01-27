import { IProductQualityPetri, IPlace } from '@/petri'

export class PetriNetInitializer implements IPetriNetInitializer {
  private petriNet: IProductQualityPetri

  constructor(petriNet: IProductQualityPetri) {
    this.petriNet = petriNet
    this.initializePetriNet()
  }
  private initializePetriNet() {
    const places = new Map<string, IPlace>()

    places.set('pProduct', { name: 'product', tokens: 0 })
    places.set('pQuality', { name: 'quality', tokens: 0 })
    places.set('pFail', { name: 'fail', tokens: 0 })
    places.set('pRedo', { name: 'redo', tokens: 0 })
    places.set('pFinished', { name: 'finished', tokens: 0 })

    places.forEach((place) => {
      this.petriNet.addPlace(place)
      this.petriNet.setInitialMarking(place.name, place.tokens)
    })

    const [pProduct, pQuality, pFail, pRedo, pFinished] = Array.from(
      places.values(),
    )

    const tTest = {
      name: 'Testing',
      inputPlaces: [pProduct],
      outputPlaces: [pQuality],
    }
    const tFail = {
      name: 'Fail',
      inputPlaces: [pQuality],
      outputPlaces: [pFail],
    }
    const tRedo = { name: 'Redo', inputPlaces: [pFail], outputPlaces: [pRedo] }
    const tProductCheck = {
      name: 'qualityCheck',
      inputPlaces: [pQuality],
      outputPlaces: [pFinished],
    }
    const tRemadeProduct = {
      name: 'remadeProduct',
      inputPlaces: [pRedo],
      outputPlaces: [pProduct],
    }

    const transitions = [tTest, tFail, tRedo, tProductCheck, tRemadeProduct]

    transitions.forEach((transition) => {
      this.petriNet.addTransition(transition)
    })
  }
  public getPetriNet(): IProductQualityPetri {
    return this.petriNet
  }
}

export interface IPetriNetInitializer {
  getPetriNet(): IProductQualityPetri
}
