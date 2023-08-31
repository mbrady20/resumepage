interface Answer {
    syd: number,
    lok: number,
    stu: number,
    el: number
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
export type {Answer, PetImage, Pet}