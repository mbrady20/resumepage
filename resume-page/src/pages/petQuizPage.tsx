import Head from "next/head";
import Link from "next/link";

import styles from "./index.module.css";
import FileUpload from "npm/components/fileUpload";
import { Container, Center, SimpleGrid, GridItem, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, FormControl, FormLabel, Input, AlertDialogFooter } from "@chakra-ui/react";
import router from "next/router";
import { app, db } from "npm/firebase/clientApp";
import { ref } from "firebase/storage";
import { DocumentData, Firestore, QueryDocumentSnapshot, SnapshotOptions, collection, doc, getDoc, getDocs, limit, query} from "firebase/firestore";
import { Pet, PetImage } from "npm/interfaces/answer.interface";
import { FirebaseApp } from "firebase/app";
import { Image, Text} from "@chakra-ui/react";
import { useEffect } from "react";
import { petVoteState } from "npm/states/selection_state";
import { useRecoilState } from "recoil";

export default function Home() {

  const[petSelection, setPetSelection] = useRecoilState<PetImage[]>(petVoteState);

  function nextRank(e: number) {
    if(e === 1)
      return 2;
    else if(e === 2)
      return 3;
    else if(e === 3)
    return 4;
    else (e===4)
    return 1;
  
  }
  function petImageClick(e: PetImage) {
    let newSelection = [...petSelection];
    newSelection.forEach((element, index) => {
      if(element.petId === e.petId){
          let newElement = {
            petId: element.petId,
            url: element.url,
            name: element.name,
            rank: nextRank(element.rank)
          
        }
      
      
      newSelection.splice(index, 1, newElement);

      }
    })
    setPetSelection(newSelection);
  }
  return (
    <Container minWidth={"90vw"}>
    
        
          <Center paddingBottom={"10px"} paddingTop={"20px"}>
            <Text fontSize={"4xl"} as={"b"}>
              Which pet is the cutest?
            </Text>
          </Center>
          <Center paddingBottom={"15px"}>
            <Text fontSize={"2xl"} textColor={"gray"}>
              Click on the images below to rank these pets.
            </Text>
          </Center>
        
      
      {/* {isSubmitted && (
        <Center paddingBottom={"30px"} paddingTop={"20px"}>
          <Text fontSize={"4xl"} as={"b"}>
            Your Ranking!
          </Text>
        </Center>
      )} */}
      <Center>
        <SimpleGrid columns={2} gap={20}>
          {petSelection.map((petImage: PetImage) => (
           <GridItem>
               <button onClick={() => petImageClick(petImage)}>
                <Image src={petImage.url} width = {200} alt={petImage.name}></Image>
                </button>
              <Text>{petImage.name}: {petImage.rank}</Text>
            </GridItem>
          )
          )
          } 
          {/* <GridItem rowSpan={1}>
            <button onClick={() => sydneyClick()}>
              <Image
                src="/sydney2.png"
                width={150}
                height={80}
                alt="Sydney"
              ></Image>
            </button>
            <Text>Sydney: {sydImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => lokClick()}>
              <Image
                src="/loki.jpeg"
                width={150}
                height={80}
                alt="Loki"
              ></Image>
            </button>
            <Text>Loki: {lokImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => stuClick()}>
              <Image
                src="/stuart.png"
                width={150}
                height={80}
                alt="Stuart"
              ></Image>
            </button>
            <Text>Stuart: {stuImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => elClick()}>
              <Image
                src="/elgato.png"
                width={150}
                height={80}
                alt="El Gato"
              ></Image>
            </button>
            <Text>El Gato {elImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem colSpan={2}></GridItem> */}
        </SimpleGrid>
      </Center>
      <Center>
         <Button>Submit!</Button>
      
      </Center>
    </Container>
  );
}
