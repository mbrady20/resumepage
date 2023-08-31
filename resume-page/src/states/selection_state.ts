import { atom } from "recoil"
import { Answer, PetImage } from "npm/interfaces/answer.interface"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const submittedState = atom<boolean>({
    key: 'submittedState',
    default: false ,
    effects_UNSTABLE: [persistAtom]
  })
  
  
  
  const answerState = atom<Answer>({
    key: 'answerState',
    default: { 
      syd: 4,
      lok: 4,
      stu: 4,
      el: 4
    },
    effects_UNSTABLE: [persistAtom]
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
  export {submittedState, answerState, petVoteState}