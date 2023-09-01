import Head from "next/head";
import Link from "next/link";

import styles from "./index.module.css";
import FileUpload from "npm/components/fileUpload";
import {
  Container,
  Center,
  SimpleGrid,
  GridItem,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  FormControl,
  FormLabel,
  Input,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import router from "next/router";
import { app, db } from "npm/firebase/clientApp";
import { ref } from "firebase/storage";
import { Pet, PetImage } from "npm/interfaces/answer.interface";
import { FirebaseApp } from "firebase/app";
import { Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { petVoteState, submittedState } from "npm/states/selection_state";
import { useRecoilState } from "recoil";
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";

export default function Home() {
  const [petSelection, setPetSelection] =
    useRecoilState<PetImage[]>(petVoteState);

  const [isSubmitted, setIsSubmitted] = useRecoilState(submittedState);
  const [submitReady, setSubmitReady] = useState(false);
  const [alertText, setAlertText] = useState<string[]>(["", "", ""]);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [input, setInput] = useState("");
  const [validInit, setValidInit] = useState(false);
  const [ranksValid, setRanksValid] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    validityCheck();
  }, [input]);
  function validityCheck() {
    if (/^[A-Za-z]{2,3}$/.test(input)) setValidInit(true);
    else setValidInit(false);
  }

  const petDataConverter = {
    toFirestore(pet: Pet): DocumentData {
      return {name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): Pet {
      const data = snapshot.data();
      return {name: data.name, url: data.url, avgWinShare: data.avgWinShare, firstPlaces: data.firstPlaces, roundsPlayed: data.roundsPlayed, petId: data.petId};
    }
  };

  function submitButton() {
    loop1: for (let i = 0; i < petSelection.length; i++) {
      loop2: for (let j = 0; j < petSelection.length; j++) {
        if (
          petSelection.at(i)!.rank === petSelection.at(j)!.rank &&
          petSelection.at(i)!.petId != petSelection.at(j)!.petId
        ) {
          setAlertFeatures(false);
          break loop1;
        }
      }
      setAlertFeatures(true);
    }
    onOpen();
  }

  function setAlertFeatures(e: boolean) {
    if (e) {
      setSubmitReady(true);
      let text = "";
      petSelection.forEach((pet) => text.concat(pet.name + ": " + pet.rank));
      setAlertText(["Do you want to submit this ranking?", text, ""]);
    } else {
      setSubmitReady(false);
      setAlertText([
        "Please make sure you've given each pet a different ranking",
        "",
        "",
      ]);
      setRanksValid(false);
    }
  }

  function columns() {
    if (submitReady) return 2;
    else return 1;
  }

  function nextRank(e: number) {
    if (e === 1) return 2;
    else if (e === 2) return 3;
    else if (e === 3) return 4;
    else e === 4;
    return 1;
  }

  function petImageClick(e: PetImage) {
    let newSelection = [...petSelection];
    newSelection.forEach((element, index) => {
      if (element.petId === e.petId) {
        let newElement = {
          petId: element.petId,
          url: element.url,
          name: element.name,
          rank: nextRank(element.rank),
        };

        newSelection.splice(index, 1, newElement);
      }
    });
    setPetSelection(newSelection);

    petSelection.forEach((pet) => console.log(pet.rank));
  }

  

  const submitPost = async () => {
    let first = "";
    let second = "";
    let third = "";
    let fourth = "";

    petSelection.forEach((pet) => {
      if(pet.rank === 1)
        first = pet.petId;
      else if(pet.rank === 2)
        second = pet.petId;
      else if(pet.rank === 3)
        third = pet.petId;
      else if(pet.rank === 4)
        fourth = pet.petId;
    })
  
    const docRef = await addDoc(collection(db, "ranks"), {
      initials: input,
      firstPlacePetId: first,
      secondPlacePetId: second,
      thirdPlacePetId: third,
      fourthPlacePetId: fourth
    })


    const firstQuery = query(collection(db, "pets"), where("petId", "==", first), limit(1)).withConverter(petDataConverter);
    const firstDoc = (await getDocs(firstQuery)).docs[0]
    const firstDocRef = firstDoc!.ref;
    const firstDocData = firstDoc!.data();
    
    const secondQuery = query(collection(db, "pets"), where("petId", "==", second), limit(1)).withConverter(petDataConverter);
    const secondDoc = (await getDocs(secondQuery)).docs[0]
    const secondDocRef = secondDoc!.ref;
    const secondDocData = secondDoc!.data();

    const thirdQuery = query(collection(db, "pets"), where("petId", "==", third), limit(1)).withConverter(petDataConverter);
    const thirdDoc = (await getDocs(thirdQuery)).docs[0]
    const thirdDocRef = thirdDoc!.ref;
    const thirdDocData = thirdDoc!.data();

    const fourthQuery = query(collection(db, "pets"), where("petId", "==", fourth), limit(1)).withConverter(petDataConverter);
    const fourthDoc = (await getDocs(fourthQuery)).docs[0]
    const fourthDocRef = fourthDoc!.ref;
    const fourthDocData = fourthDoc!.data();

    await updateDoc(firstDocRef, {
      roundsPlayed: firstDocData.roundsPlayed + 1,
      firstPlaces: firstDocData.firstPlaces + 1,
      avgWinShare: avgWinShareCalc(1, firstDocData.roundsPlayed, firstDocData.avgWinShare)
    })

    await updateDoc(secondDocRef, {
      roundsPlayed: secondDocData.roundsPlayed + 1,
      avgWinShare: avgWinShareCalc(2, secondDocData.roundsPlayed, secondDocData.avgWinShare)
    })

    await updateDoc(thirdDocRef, {
      roundsPlayed: thirdDocData.roundsPlayed + 1,
      avgWinShare: avgWinShareCalc(3, thirdDocData.roundsPlayed, thirdDocData.avgWinShare)
    })

    await updateDoc(fourthDocRef, {
      roundsPlayed: fourthDocData.roundsPlayed + 1,
      avgWinShare: avgWinShareCalc(2, fourthDocData.roundsPlayed, fourthDocData.avgWinShare)
    })


    
    router.push("/petQuizData");

    setIsSubmitted(true);

  }

  function avgWinShareCalc(place: number, gamesPlayedPrev: number, prevWinShare: number) {
    return (((prevWinShare * gamesPlayedPrev) + 5 - place) / (gamesPlayedPrev + 1))/4;
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
                <Image
                  src={petImage.url}
                  width={200}
                  maxHeight={350}
                  minHeight={275}
                  alt={petImage.name}
                ></Image>
              </button>
              <Text>
                {petImage.name}: {petImage.rank}
              </Text>
            </GridItem>
          ))}
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
        { <Button onClick={submitButton}>Submit!</Button>}
  
      </Center>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>{alertText[0]}</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>{alertText[1]}</Text>
              {!!submitReady && (
                <FormControl>
                  <FormLabel>Please Enter Your Initials!</FormLabel>
                  <Input
                    placeholder="JMS"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value.toLocaleUpperCase());
                    }}
                  ></Input>
                </FormControl>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <SimpleGrid columns={columns()} spacing={5}>
                <Button ref={cancelRef} onClick={onClose}>
                  Change my answer!
                </Button>
                {submitReady && (
                  <Button
                    colorScheme="telegram"
                    onClick={submitPost}
                    isDisabled={!validInit && !isSubmitted}
                  >
                    Submit!
                  </Button>
                )}
              </SimpleGrid>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
