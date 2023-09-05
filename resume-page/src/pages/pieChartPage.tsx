import { Center, Container, Text} from "@chakra-ui/react";
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "npm/firebase/clientApp";
import { ChartData, Pet } from "npm/interfaces/answer.interface";
import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function PieChartPage() {
    const [pieChartData, setPieChartData] = useState<ChartData[]>();

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

    async function getPieChartData() {
        const pieChartQuery = query(collection(db, "pets"), limit(10), orderBy("firstPlaces", "desc")).withConverter(petDataConverter);
        const snapshot = (await getDocs(pieChartQuery)).docs;
    
        const array: ChartData[] = [];
        snapshot.forEach((doc) => {
          array.push(
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              name: doc.data().name,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              value: doc.data().firstPlaces
            }
          );
        })
        setPieChartData(array);
      }

      useEffect(() => {
        getPieChartData();
      },[])

    return(
        <div>
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
              {pieChartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Container>
      </div>
    )
}