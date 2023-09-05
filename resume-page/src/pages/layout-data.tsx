import { Box, Button, Center, Container, Grid, GridItem, Icon } from "@chakra-ui/react";
import router from "next/router";
import { AiFillHome } from "react-icons/ai";

export default function DataLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {

    return(
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
                onClick={() => router.push("createAPetPage")}
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
                onClick={() => router.push("recentResultsPage")}
              >
                Recent Responses
              </Button>
            </Box>
            <Box paddingY={"50px"}>
              <Button
                width={"100%"}
                onClick={() => router.push("barChartPage")}
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
                onClick={() => router.push("pieChartPage")}
              >
                Pie Chart View
              </Button>
            </Box>
          </Container>
        </GridItem>
        
          <GridItem colSpan={9} height={"100vh"} bg="green.50">
           
                {children}
            
          </GridItem>
  
        
        
      </Grid>
    )
  }