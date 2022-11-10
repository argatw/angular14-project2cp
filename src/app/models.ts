// export interface BookSummary {
//     bookId: string
//     title: string
//   }
  
// export interface Book {
//     bookId: string
//     title: string
//     authors: string
//     description: string
//     rating: number
//     imageUrl: string
//     }

export interface Carpark {
    carparkNum: string
    address: string
    carparkType: string
    parkingSystem: string
    parkingTerm: string
    freeParking: string
    nightParking: string
    gantryHeight: string
    decks: string
    totalLots: number
    availableLots: number
    xCoord: number
    yCoord: number
    cpBasement: string
    }

export interface CarparkList {
    address: string
    carparkNum: string 
    }

export interface Favorites {
    carparkNum: string
    address: string
    email: string
}

