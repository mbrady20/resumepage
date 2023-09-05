import { Center, Container, Text } from "@chakra-ui/react";
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "npm/firebase/clientApp";
import type { ChartData, Pet, PetImage } from "npm/interfaces/answer.interface";
import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

export default function BarChartPage() {
  const [barChartData, setBarChartData] = useState<ChartData[]>();

  useEffect(() => {
    getBarChartData();
  },[])
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

  
  async function getBarChartData() {
    const pieChartQuery = query(collection(db, "pets"), limit(10), orderBy("avgWinShare", "desc")).withConverter(petDataConverter);
    const snapshot = (await getDocs(pieChartQuery)).docs;

    const array: ChartData[] = [];
    snapshot.forEach((doc) => {
      array.push(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        {name: doc.data().name,
          value: doc.data().avgWinShare * 100
        }
      );
    })
    setBarChartData(array);
  }

    return(
        <div>
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
      </div>
    )
};