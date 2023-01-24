export type Place = {
  name: string
  tokens: number
}

interface IPetriTransition {
  name: string
  inputPlaces: Place[]
  outputPlaces: Place[]
}

export interface IProductQualityPetri {
  transitions: IPetriTransition[]
  places: Place[]
  markings: Map<Place, number>
}

export class ProductQualityPetri implements IProductQualityPetri {
  transitions: IPetriTransition[]
  places: Place[]
  markings: Map<Place, number>

  constructor() {
    this.transitions = []
    this.places = []
    this.markings = new Map()
  }

  addPlace(place: Place) {
    this.places.push(place)
    this.markings.set(place, 0)
  }

  addTransition(transition: IPetriTransition) {
    this.transitions.push(transition)
  }

  setInitialMarking(place: Place, tokens: number) {
    this.markings.set(place, tokens)
  }

  isEnableTransition(transition: IPetriTransition) {
    let enabled = true
    for (const inputPlace of transition.inputPlaces) {
      const placeMarking = this.markings.get(inputPlace)
      if (!placeMarking || placeMarking < (inputPlace.tokens || 0)) {
        enabled = false
        break
      }
    }
    return enabled
  }

  fireTransition(transition: IPetriTransition) {
    this.showConsoleBefore(transition)

    if (!this.isEnableTransition(transition)) {
      throw new Error('Transition is not enabled')
    }

    for (const inputPlace of transition.inputPlaces) {
      this.markings.set(inputPlace, (this.markings.get(inputPlace) ?? 0) - inputPlace.tokens)
    }
    for (const outputPlace of transition.outputPlaces) {
      this.markings.set(outputPlace, (this.markings.get(outputPlace) ?? 0) + transition.inputPlaces[0].tokens)
    }

    let updatedInputPlaces = [...transition.inputPlaces]
    let updatedOutputPlaces = [...transition.outputPlaces]

    updatedInputPlaces = updatedInputPlaces.map((place) => {
      return { ...place, tokens: this.markings.get(transition.inputPlaces[0]) ?? 0 }
    })

    updatedOutputPlaces = updatedOutputPlaces.map((place) => {
      return { ...place, tokens: this.markings.get(transition.outputPlaces[0]) ?? 0 }
    })

    const updatedTransition = { ...transition, inputPlaces: updatedInputPlaces, outputPlaces: updatedOutputPlaces }
    this.changeToken(updatedTransition)

    this.showConsoleAfter()
  }

  changeToken(transition: IPetriTransition) {
    this.transitions = this.transitions.filter((t) => t.name !== transition.name)
    this.transitions.push(transition)
  }

  showConsoleBefore(transition: IPetriTransition) {
    console.log('transation in progress (before): ', transition)
    console.log('markings (before): ', this.markings)
  }

  showConsoleAfter() {
    console.log('transation in progress (after): ', this.transitions[0])
    console.log('markings (after): ', this.markings)
    console.log('=============================================================')
  }
}
