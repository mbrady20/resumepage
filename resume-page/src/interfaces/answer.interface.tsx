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
export type {Rank, PetImage, Pet}