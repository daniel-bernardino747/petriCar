import { NotEnableError } from '@/errors'

export class ProductQualityPetri implements IProductQualityPetri {
  markings: Map<string, number>
  places: IPlace[]
  transitions: IPetriTransition[]
  constructor() {
    this.transitions = []
    this.places = []
    this.markings = new Map()
  }

  private isEnableTransition(transition: IPetriTransition) {
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

  private removeToken(place: IPlace): void {
    const newPlaces = this.places.map((p) => {
      if (p.name === place.name) {
        p.tokens--
      }
      return p
    })
    this.places = newPlaces
    this.markings.set(place.name, place.tokens)
  }

  private showConsoleAfter(transition: IPetriTransition) {
    console.log('transation in progress (after): ', transition)
    console.log('markings (after): ', this.markings)
    console.log('=============================================================')
  }

  private showConsoleBefore(transition: IPetriTransition) {
    console.log('transation in progress (before): ', transition)
    console.log('markings (before): ', this.markings)
  }

  public addPlace(place: IPlace): void {
    this.places.push(place)
    this.markings.set(place.name, 0)
  }

  public addToken(place: IPlace): void {
    const newPlaces = this.places.map((p) => {
      if (p.name === place.name) {
        p.tokens++
      }
      return p
    })
    this.places = newPlaces
    this.markings.set(place.name, place.tokens)
  }

  public addTransition(transition: IPetriTransition): void {
    this.transitions.push(transition)
  }

  public fireTransition(transition: IPetriTransition): void {
    this.showConsoleBefore(transition)

    if (!this.isEnableTransition(transition))
      throw new NotEnableError('Transition is not enabled')

    for (const inputPlace of transition.inputPlaces)
      this.removeToken(inputPlace)
    for (const outputPlace of transition.outputPlaces)
      this.addToken(outputPlace)

    this.showConsoleAfter(transition)
  }

  public setInitialMarking(name: string, tokens: number): void {
    this.markings.set(name, tokens)
  }
}

export type IPlace = {
  name: string
  tokens: number
}

type IPetriTransition = {
  name: string
  inputPlaces: IPlace[]
  outputPlaces: IPlace[]
}

export interface IProductQualityPetri {
  transitions: IPetriTransition[]
  places: IPlace[]
  markings: Map<string, number>

  addToken(place: IPlace): void
  addPlace(place: IPlace): void
  addTransition(transition: IPetriTransition): void
  setInitialMarking(name: string, tokens: number): void
  fireTransition(transition: IPetriTransition): void
}
