"use client";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  TooltipProps,
  Tr,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import router from "next/router";
import SignIn from "npm/components/auth/signIn";
import SignInOrUp from "npm/components/auth/signInOrUp";
import FileUpload from "npm/components/fileUpload";
import { auth, db } from "npm/firebase/clientApp";
import type { ChartData, DisplayRank, Pet, PetImage, Rank } from "npm/interfaces/answer.interface";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  Bar,
  BarChart,
  Cell,
  LabelListProps,
  LabelProps,
  Pie,
  PieChart,
  PieLabel,
  PieLabelRenderProps,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Props } from "recharts/types/container/Surface";
import { useRecoilState } from "recoil";

export default function PetQuizData() {
  const [viewMode1, setViewMode1] = useState(false);
  const [viewMode2, setViewMode2] = useState(false);

  const [recentResults, setRecentResults] = useState<DisplayRank[]>();
  const [pieChartData, setPieChartData] = useState<ChartData[]>();
  const [barChartData, setBarChartData] = useState<ChartData[]>();
  const [signedIn, setSignedIn] = useState(false);
  const [userPet, setUserPet] = useState<Pet | null>();


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const radius: number =
      props.innerRadius + (props.outerRadius - props.innerRadius) * 0.5;
    const x: number = props.cx + radius * Math.cos(-props.midAngle * RADIAN);
    const y: number = props.cy + radius * Math.sin(-props.midAngle * RADIAN);

    if (props.percent.valueOf() != 0)
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > props.cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {` ${props.name} ${(props.percent * 100).toFixed(0)}% `}
        </text>
      );
  };

  function resultsButtonClick() {
    setViewMode1(false);
    setViewMode2(false);
  }

  function barButtonClick() {
    setViewMode1(true);
    setViewMode2(false);
  }

  function pieButtonClick() {
    setViewMode1(false);
    setViewMode2(true);
  }

  function recentButtonClick() {
    setViewMode1(true);
    setViewMode2(true);
  }

  const rankConverter = {
    toFirestore(rank: Rank): DocumentData {
      return {initials: rank.initials, firstPlacePetId: rank.firstPlacePetId, secondPlacePetId: rank.secondPlacePetId, thirdPlacePetId: rank.thirdPlacePetId, fourthPlacePetId: rank.fourthPlacePetId};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): Rank {
      const data = snapshot.data();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return {initials: data.initials, firstPlacePetId: data.firstPlacePetId, secondPlacePetId: data.secondPlacePetId, thirdPlacePetId: data.thirdPlacePetId, fourthPlacePetId: data.fourthPlacePetId};
    }
  };


  const petConverter = {
    toFirestore(pet: PetImage): DocumentData {
      return {name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): PetImage {
      const data = snapshot.data();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return {name: data.name, url: data.url, rank: 4, petId: data.petId};
    }
  };

  const petDataConverter = {
    toFirestore(pet: Pet): DocumentData {
      return {name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): Pet {
      const data = snapshot.data();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return {name: data.name, url: data.url, avgWinShare: data.avgWinShare, firstPlaces: data.firstPlaces, roundsPlayed: data.roundsPlayed, petId: data.petId};
    }
  };

  useEffect(() => {
    getRecentResultsData();
    getPieChartData();
    getBarChartData();
  }, [])
  
  async function getRecentResultsData() {
    const q = query(collection(db, "ranks"), limit(4)).withConverter(rankConverter);


    const snapshot = (await getDocs(q)).docs;

    const rankArray: DisplayRank[] = []
    snapshot.forEach(async (doc) => {
      const petArray: PetImage[] = []

      const first = doc.data().firstPlacePetId;
      const second = doc.data().secondPlacePetId;
      const third = doc.data().thirdPlacePetId;
      const fourth = doc.data().fourthPlacePetId;

      const firstQuery = query(collection(db, "pets"), where("petId", "==", first), limit(1)).withConverter(petConverter);
      const firstDoc = (await getDocs(firstQuery)).docs[0]
      const firstDocData = firstDoc!.data();

      const secondQuery = query(collection(db, "pets"), where("petId", "==", second), limit(1)).withConverter(petConverter);
      const secondDoc = (await getDocs(secondQuery)).docs[0]
      const secondDocData = secondDoc!.data();
  
      const thirdQuery = query(collection(db, "pets"), where("petId", "==", third), limit(1)).withConverter(petConverter);
      const thirdDoc = (await getDocs(thirdQuery)).docs[0]
      const thirdDocData = thirdDoc!.data();
    
      const fourthQuery = query(collection(db, "pets"), where("petId", "==", fourth), limit(1)).withConverter(petConverter);
      const fourthDoc = (await getDocs(fourthQuery)).docs[0]
      const fourthDocData = fourthDoc!.data();

      petArray.push(firstDocData);
      petArray.push(secondDocData);
      petArray.push(thirdDocData);
      petArray.push(fourthDocData);
      
      const rankData: DisplayRank = {
        initials: doc.data().initials,
        pets: petArray
      };

      rankArray.push(rankData);
     } )
  
    setRecentResults(rankArray);
  }

  async function getPieChartData() {
    const pieChartQuery = query(collection(db, "pets"), limit(10), orderBy("firstPlaces", "desc")).withConverter(petDataConverter);
    const snapshot = (await getDocs(pieChartQuery)).docs;

    const array: ChartData[] = [];
    snapshot.forEach((doc) => {
      array.push(
        {
          name: doc.data().name,
          value: doc.data().firstPlaces
        }
      );
    })
    setPieChartData(array);
  }

  async function getBarChartData() {
    const pieChartQuery = query(collection(db, "pets"), limit(10), orderBy("avgWinShare", "desc")).withConverter(petDataConverter);
    const snapshot = (await getDocs(pieChartQuery)).docs;

    const array: ChartData[] = [];
    snapshot.forEach((doc) => {
      array.push(
        {name: doc.data().name,
          value: doc.data().avgWinShare * 100
        }
      );
    })
    setBarChartData(array);
  }


  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    setSignedIn(true);
    // ...
  } else {
    // User is signed out
    setSignedIn(false);
    setUserPet(null);
  }
});

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(10, 1fr)"
      gap={0}
    >
      <GridItem colSpan={1} height={"100vh"} bg="blue.100">
        <Container>
          <Box>
            <Button
              onClick={() => router.push("/")}
              width={"100%"}
              variant={"twitter"}
            >
              <Icon as={AiFillHome}></Icon>
            </Button>
          </Box>
          <Box paddingY={"50px"}>
            <Button
              width={"100%"}
              bg="green.100"
              borderRadius="50px"
              _hover={{ bg: "green.200" }}
              onClick={resultsButtonClick}
            >
              Create a Pet
            </Button>
          </Box>
          <Box paddingY={"50px"}>
            <Button
              width={"100%"}
              bg="purple.100"
              borderRadius={"50px"}
              _hover={{ bg: "purple.200" }}
              onClick={recentButtonClick}
            >
              Recent Responses
            </Button>
          </Box>
          <Box paddingY={"50px"}>
            <Button
              width={"100%"}
              onClick={barButtonClick}
              bg="red.100"
              borderRadius="50px"
              _hover={{ bg: "red.200" }}
            >
              Bar Chart View
            </Button>
          </Box>
          <Box paddingY={"50px"}>
            <Button
              width={"100%"}
              bg="yellow.100"
              borderRadius={"50px"}
              _hover={{ bg: "yellow.200" }}
              onClick={pieButtonClick}
            >
              Pie Chart View
            </Button>
          </Box>
        </Container>
      </GridItem>
       {!viewMode1 && !viewMode2 && (
        <GridItem colSpan={9} height={"100vh"} bg="green.50">
          <Center>
            {!signedIn && <SignInOrUp/>}
            {!!signedIn && <FileUpload/>}
            </Center>
        </GridItem>
      )}
        {viewMode1 && !viewMode2 && (
        <GridItem colSpan={9} height={"100vh"} bg="red.50">
          <Center>
            <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>
              Percentage of vote share for each pet
            </Text>
          </Center>
          <Container height={"90vh"} minWidth={"80vw"}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <XAxis
                  dataKey="name"
                  stroke="#00000"
                  fontSize={20}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#00000"
                  fontSize={14}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `%${value}`}
                />
                <Bar dataKey="value" fill="#528aae" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Container>
        </GridItem>
      )} 

      {!viewMode1 && viewMode2 && (
        <GridItem colSpan={9} height={"100vh"} bg="yellow.50">
          <Center>
            <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>
              Percentage of voters who voted each pet the cutest
            </Text>
          </Center>
          <Container height={"90vh"} minWidth={"80vw"}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={350}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {pieChartData!.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Container>
        </GridItem>
      )} 
      {!!viewMode1 && !!viewMode2 && (
        <GridItem colSpan={9} height={"100vh"} bg="purple.50">
          <Center>
            <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>
              Ten most recent pet quiz results
            </Text>
          </Center>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Initials</Th>
                  <Th>First</Th>
                  <Th>Second</Th>
                  <Th>Third</Th>
                  <Th>Fourth</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentResults?.map((element) => (
                  <Tr key={element.initials}>
                    <Td>{element.initials}</Td>
                    <Td>
                    <Image src={element.pets.at(0)?.url} height={20} alt="first"/>
                      {element.pets.at(0)!.name}
                    </Td>
                    <Td>
                    <Image src={element.pets.at(1)?.url} height={20}/>
                      {element.pets.at(1)!.name}</Td>
                    <Td><Image src={element.pets.at(2)?.url} height={20}/>{element.pets.at(2)!.name}</Td>
                    <Td><Image src={element.pets.at(3)?.url} height={20}/>
                      {element.pets.at(3)!.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
      )} 
    </Grid>
  );
}
