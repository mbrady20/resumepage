import { atom } from "recoil"
import {  PetImage } from "npm/interfaces/answer.interface"
import { recoilPersist } from "recoil-persist";
import { User } from "firebase/auth";

const { persistAtom } = recoilPersist();

const submittedState = atom<boolean>({
    key: 'submittedState',
    default: false 
  })
  
  


  const petVoteState = atom<PetImage[]>({
    key: 'voteState',
    default: [{
        name: "",
        petId: "",
        url: "",
        rank: 0
    }],

    effects_UNSTABLE: [persistAtom]
  })


  export {submittedState, petVoteState}