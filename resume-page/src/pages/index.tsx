"use client";

import {
  Button,
  Container,
  Text,
  Image,
  Box,
  Flex,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot} from "firebase/firestore";
import Head from "next/head";

import { useRouter } from "next/router";
import { db } from "npm/firebase/clientApp";
import type {  PetImage } from "npm/interfaces/answer.interface";
import { petVoteState } from "npm/states/selection_state";
import { useEffect } from "react";

import { useRecoilState } from "recoil";

export default function Home() {
  const router = useRouter();


  const[petSelection, setPetSelection] = useRecoilState<PetImage[]>(petVoteState);


  const petConverter = {
    toFirestore(pet: PetImage): DocumentData {
      return {name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): PetImage {
      const data = snapshot.data();
      return {name: data.name, url: data.url, rank: 4, petId: data.petId};
    }
  };

  function randOrderByOne() {
    const num: number = Math.random() * 5;
    if(num > 5)
      return "petId";
    if(num > 4)
      return "name";
    if (num > 3)
      return "avgWinShare";
    if(num > 2)
      return "roundsPlayed";
    if(num > 1)
      return "url";
    else
      return "firstPlaces";
  }

  function randOrderByTwo() {
    const num: number = Math.random();
    if (num > 0.5)
      return "asc";
    else
      return "desc";
  }
  async function getData() {

     const q =  query(collection(db, "pets"), limit(4), orderBy(randOrderByOne(), randOrderByTwo())).withConverter(petConverter);
    const snapshot = (await getDocs(q)).docs;
    const array: PetImage[] = [];
    snapshot.forEach((doc) => {
      array.push(doc.data());
    }
    )

    setPetSelection(array);
   }

useEffect(() => {

getData();
}, [])

  return (


      <Container>
        <Container paddingTop="10px" paddingBottom={"30px"}>
          <Center>
            <Image src="me.png" width={120} height={120} borderRadius={"50%"} alt="Michael Brady"/>
          </Center>
          <Center paddingY="10px">
            <Text fontSize="50px" as="b" textAlign="center">
              Michael Brady
            </Text>
          </Center>
          <Text fontSize="30px" color="gray.500" textAlign="center">
            I design programs.
          </Text>
        </Container>
        <Container>
          <Text fontSize="20px" color="gray.500" textAlign="center">
            I am a rising Junior at UW Madison majoring in Computer Science,
            Math and Philosophy. I have experience in Java and Javascript
          </Text>
          <Container paddingY="50px">
            <Center>
              <Button bg="blue.800" color="white" onClick={() => router.push("/aboutPage")}>
                More about me &rarr;
              </Button>
            </Center>
            <Container >
            <Center paddingTop={"25px"}>
          {/*    {!isSubmitted && <Text>Take the Pet Quiz!</Text>}
             {isSubmitted && <Text>Sure you don&apos;t want to take another look at your results?</Text>}
              </Center>
              <Center paddingTop={"20px"}>
              {!isSubmitted && <Button colorScheme={"green"} onClick={() => router.push("/petQuizPage")}>Pet Quiz!</Button>}
              {isSubmitted && <Button colorScheme={"green"} onClick={() => router.push("/petQuizData")}>View Results</Button>} */}

            </Center>
            </Container>
          </Container>
          
          <Container paddingTop={"5px"}>
            <Center>
              <Text fontSize={"50px"} as="b">
                Get in touch
              </Text>
              </Center>
              <Text fontSize={"20px"} align={"center"} color={"gray.500"}>
                Feel free to message me about all things programming
              </Text>
   
            <Flex alignItems={"center"} paddingTop={"20px"}>
              <Box w="70px">
                <Button colorScheme="twitter" ><a href="mailto:bradymichael362@gmail.com">Send Me an Email</a></Button>
              </Box>
              <Spacer w="20px"></Spacer>
              <Box>
                <Button onClick={() => router.push("https://calendly.com/bradymichael362/30min")}>Schedule a meeting</Button>
              </Box>
            </Flex>
          </Container>
        </Container>
      </Container>
     
 
  );
}
