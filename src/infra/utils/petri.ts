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
  markings: Map<string, number>
}

export class ProductQualityPetri implements IProductQualityPetri {
  transitions: IPetriTransition[]
  places: Place[]
  markings: Map<string, number>

  constructor() {
    this.transitions = []
    this.places = []
    this.markings = new Map()
  }

  addToken(place: Place) {
    const newPlaces = this.places.map((p) => {
      if (p.name === place.name) {
        p.tokens++
      }
      return p
    })
    this.places = newPlaces
    this.markings.set(place.name, place.tokens)
  }

  removeToken(place: Place) {
    const newPlaces = this.places.map((p) => {
      if (p.name === place.name) {
        p.tokens--
      }
      return p
    })
    this.places = newPlaces
    this.markings.set(place.name, place.tokens)
  }

  addPlace(place: Place) {
    this.places.push(place)
    this.markings.set(place.name, 0)
  }

  addTransition(transition: IPetriTransition) {
    this.transitions.push(transition)
  }

  setInitialMarking(name: string, tokens: number) {
    this.markings.set(name, tokens)
  }

  isEnableTransition(transition: IPetriTransition) {
    let enabled = true
    for (const inputPlace of transition.inputPlaces) {
      const placeMarking = this.markings.get(inputPlace.name)
      if (!placeMarking || placeMarking < (inputPlace.tokens || 0)) {
        enabled = false
        break
      }
    }
    return enabled
  }

  fireTransition(transition: IPetriTransition) {
    this.showConsoleBefore(transition)

    if (!this.isEnableTransition(transition))
      throw new Error('Transition is not enabled')

    for (const inputPlace of transition.inputPlaces)
      this.removeToken(inputPlace)
    for (const outputPlace of transition.outputPlaces)
      this.addToken(outputPlace)

    this.showConsoleAfter(transition)
  }

  changeToken(transition: IPetriTransition) {
    this.transitions = this.transitions.filter(
      (t) => t.name !== transition.name,
    )
    this.transitions.push(transition)
  }

  showConsoleBefore(transition: IPetriTransition) {
    console.log('transation in progress (before): ', transition)
    console.log('markings (before): ', this.markings)
  }

  showConsoleAfter(transition: IPetriTransition) {
    console.log('transation in progress (after): ', transition)
    console.log('markings (after): ', this.markings)
    console.log('=============================================================')
  }
}
