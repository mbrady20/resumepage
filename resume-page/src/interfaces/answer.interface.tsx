interface Rank {
    initials: string,
    firstPlacePetId: string,
    secondPlacePetId: string,
    thirdPlacePetId: string,
    fourthPlacePetId: string
}

interface PetImage {
    petId: string,
    name: string,
    rank: number, 
    url: string
}

interface Pet {
    name: string,
    url: string,
    avgWinShare: number,
    firstPlaces: number,
    roundsPlayed: number,
    petId: string
}

interface DisplayRank {
    initials: string,
    pets: PetImage[]
}

interface ChartData {
    name: string,
    value: number
}

export type {Rank, PetImage, Pet, DisplayRank, ChartData}