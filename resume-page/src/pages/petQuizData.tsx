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
import router from "next/router";
import { Answer} from "npm/interfaces/answer.interface";
import { answerState } from "npm/states/selection_state";
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
  const [viewMode1, setViewMode1] = useState(true);
  const [viewMode2, setViewMode2] = useState(true);

  const [sydRank, setSydRank] = useState(0);
  const [lokRank, setLokRank] = useState(0);
  const [stuRank, setStuRank] = useState(0);
  const [elRank, setElRank] = useState(0);
  const [sydRankOne, setSydRankOne] = useState(0);
  const [lokRankOne, setLokRankOne] = useState(0);
  const [stuRankOne, setStuRankOne] = useState(0);
  const [elRankOne, setElRankOne] = useState(0);
  const [totCount, setTotCount] = useState(0);
  const [sydPSum, setSydPsum] = useState(0);
  const [lokPSum, setLokPsum] = useState(0);
  const [stuPSum, setStuPsum] = useState(0);
  const [elPSum, setElPsum] = useState(0);

  const [answer, setAnswer] = useRecoilState<Answer>(answerState);
  let sydCount = 0;
  let lokCount = 0;
  let stuCount = 0;
  let elCount = 0;
  let count = 0;

  let sydOneCount = 0;
  let lokOneCount = 0;
  let stuOneCount = 0;
  let elOneCount = 0;

  let sydAvNum = 0;
  let lokAvNum = 0;
  let stuAvNum = 0;
  let elAvNum = 0;
/*   useEffect(() => {
    data?.forEach(
      (element: {
        sydneyRank: number;
        lokiRank: number;
        stuartRank: number;
        elGatoRank: number;
      }) => {
        count = count + 1;
        sydCount = 5 - element.sydneyRank + sydCount;
        lokCount = 5 - element.lokiRank + lokCount;
        stuCount = 5 - element.stuartRank + stuCount;
        elCount = 5 - element.elGatoRank + elCount;

        sydAvNum += element.sydneyRank;
        lokAvNum += element.lokiRank;
        stuAvNum += element.stuartRank;
        elAvNum += element.elGatoRank;

        if (element.sydneyRank.valueOf() == 1) ++sydOneCount;
        if (element.lokiRank.valueOf() == 1) ++lokOneCount;
        if (element.stuartRank.valueOf() == 1) ++stuOneCount;
        if (element.elGatoRank.valueOf() == 1) ++elOneCount;
      }
    );

    setSydRank(sydCount);
    setLokRank(lokCount);
    setStuRank(stuCount);
    setElRank(elCount);
    setSydRankOne(sydOneCount);
    setLokRankOne(lokOneCount);
    setStuRankOne(stuOneCount);
    setElRankOne(elOneCount);
    setTotCount(count);

    setSydPsum(sydAvNum);
    setStuPsum(stuAvNum);
    setLokPsum(lokAvNum);
    setElPsum(elAvNum);
  }, [data]); */

  const barChartData = [
    {
      name: "Sydney",
      total: (sydRank / (totCount * 4)) * 100,
    },
    {
      name: "Loki",
      total: (lokRank / (totCount * 4)) * 100,
    },
    {
      name: "Stuart",
      total: (stuRank / (totCount * 4)) * 100,
    },
    {
      name: "El Gato",
      total: (elRank / (totCount * 4)) * 100,
    },
  ];

  const pieChartData = [
    {
      name: "Sydney",
      value: (sydRankOne / totCount) * 100,
    },
    {
      name: "Loki",
      value: (lokRankOne / totCount) * 100,
    },
    {
      name: "Stuart",
      value: (stuRankOne / totCount) * 100,
    },
    {
      name: "El Gato",
      value: (elRankOne / totCount) * 100,
    },
  ];

  const userResultImages = [
    {
      index: answer.syd,
      value: "/sydney2.png",
      name: "Sydney",
    },
    {
      index: answer.lok,
      value: "/loki.jpeg",
      name: "Loki",
    },
    {
      index: answer.stu,
      value: "/stuart.png",
      name: "Stuart",
    },
    {
      index: answer.el,
      value: "/elgato.png",
      name: "El Gato",
    },
  ];

  const averageResultImages = [
    {
      index: sydPSum / totCount,
      value: "/sydney2.png",
      name: "Sydney",
    },
    {
      index: lokPSum / totCount,
      value: "/loki.jpeg",
      name: "Loki",
    },
    {
      index: stuPSum / totCount,
      value: "/stuart.png",
      name: "Stuart",
    },
    {
      index: elPSum / totCount,
      value: "/elgato.png",
      name: "El Gato",
    },
  ];

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
              bg="green.100"
              borderRadius="50px"
              _hover={{ bg: "green.200" }}
              onClick={resultsButtonClick}
            >
              My Results
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
            <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>
              Your Ranking!
            </Text>
          </Center>
          <SimpleGrid columns={4} paddingLeft={"80px"}>
            {userResultImages
              .sort((a, b) => a.index - b.index)
              .map((element) => (
                <GridItem key={element.index} height={"100%"} width={"50%"}>
                  <Image
                    src={element.value}
                    width={"100%"}
                    height={"100%"}
                    alt="Sydney"
                  ></Image>
                  <Text>
                    {element.name}: {element.index}
                  </Text>
                </GridItem>
              ))}
          </SimpleGrid>
          <Center>
            <Text height={"10vh"} paddingTop={"30px"} as="b" fontSize={"3xl"}>
              Average Ranking!
            </Text>
          </Center>
          (
            <SimpleGrid columns={4} paddingLeft={"80px"} paddingTop={"20px"}>
              {averageResultImages
                ?.sort((a, b) => a.index - b.index)
                .map((element) => (
                  <GridItem key={element.index} height={"100%"} width={"50%"}>
                    <Image
                      src={element.value}
                      width={"100%"}
                      height={"100%"}
                      alt="Sydney"
                    ></Image>
                    <Text>
                      {element.name}: {Math.round(element.index * 100) / 100}
                    </Text>
                  </GridItem>
                ))}
            </SimpleGrid>
          )
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
                <Bar dataKey="total" fill="#528aae" radius={[4, 4, 0, 0]} />
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
                  {pieChartData.map((entry, index) => (
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
{/* 
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
                  <Th>Sydney Rank</Th>
                  <Th>Loki Rank</Th>
                  <Th>Stuart Rank</Th>
                  <Th>El Gato Rank</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data2?.map((element ) => (
                  <Tr key={element.id}>
                    <Td>{element.initials}</Td>
                    <Td>{element.sydneyRank}</Td>
                    <Td>{element.lokiRank}</Td>
                    <Td>{element.stuartRank}</Td>
                    <Td>{element.elGatoRank}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
      )} */}
    </Grid>
  );
}
