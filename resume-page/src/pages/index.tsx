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
import { useEffect } from "react";

import { useRecoilState } from "recoil";

export default function Home() {
  const router = useRouter();




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
          <Container paddingY="40px">
            <Center>
              <Button bg="blue.800" color="white" onClick={() => router.push("/aboutPage")}>
                More about me &rarr;
              </Button>
            </Center>
            <Container >
            <Center paddingTop={"25px"}>
              <Text color="green.500">
              Check out the Pet Quiz to rank pets! 
              </Text>

            </Center>
            <Center>
              <Text color="green.500" textAlign={"center"}>
            After you done try uploading a picture of your pet to see how they stack up!
            </Text>
            </Center>
            <Center paddingTop={"10px"}>
              <Button colorScheme="green" onClick={() => router.push("/petQuizPage")}>
                Take the Pet Quiz!
              </Button>
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
