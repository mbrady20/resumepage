"use client";
import {
  Box,
  Flex,
  Text,
  Center,
  Button,
  Container,
  IconButton,
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  SimpleGrid,
  GridItem,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillTwitterCircle,
} from "react-icons/ai";

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  

  return (
    <Container bg="blue.50" minHeight={"100vh"} minWidth={"100vw"}>
      <Flex bg="blue.50" justifyItems={"center"}>
        <Box paddingTop="25px" paddingX="40px">
          <Text whiteSpace={"nowrap"} as="b">
            Michael Brady
          </Text>
        </Box>
        <Container paddingTop="25px">
          <Center>
            <Button
              borderLeftRadius="50px"
              bg="gray.200"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              bg="gray.200"
              borderRadius="0"
              onClick={() => router.push("/aboutPage")}
            >
              About
            </Button>
            <Button
              bg="gray.200"
              borderRightRadius="50px"
              onClick={() => router.push("/petQuizPage")}
            >
              Pet Quiz
            </Button>
  {/*           <Button
              borderRightRadius="50px"
              bg="gray.200"
              onClick={() => router.push("/morePage")}
            >
              More
            </Button> */}
          </Center>
        </Container>

        <Box paddingY="25px" paddingX="40px">
          <SimpleGrid columns={1}>
            <Button color="blue.600" bg={"gray.200"} onClick={onOpen}>
              Contact
            </Button>
          </SimpleGrid>
        </Box>
      </Flex>
      <SimpleGrid columns={4}>
        <GridItem height={5} ></GridItem>
        <GridItem height={5}></GridItem>
        <GridItem ></GridItem>

        <GridItem height={5} >
          {isOpen && (
            <Alert status="info" maxWidth={"500px"} minWidth={"300px"}>
              <Grid
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(10, 1fr)'
              gap={1}
              >
                <GridItem colSpan={1} rowSpan={2} as="aside">
                  <AlertIcon />
                </GridItem>
            
                <GridItem  rowSpan={1} colSpan={8}>
                  <AlertTitle>My email is bradymichael362@gmail.com</AlertTitle>
                </GridItem>
                <GridItem  rowSpan={1} colSpan={8}>
                  <AlertDescription>
                    Please don&apos;t hesitate to send me a message there!
                  </AlertDescription>
                </GridItem> 
                <GridItem colSpan={1} rowSpan={2}>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </GridItem>
          
    
              </Grid>
            </Alert>
          )}
        </GridItem>
      </SimpleGrid>
      <Flex bg="blue.50">{children}</Flex>
      <Flex bg="blue.50" paddingY="25px" justifyItems={"center"}>
        <Container>
          <Center>
            <Button
              bg="transparent"
              borderRadius={"0"}
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              bg="transparent"
              borderRadius="0"
              onClick={() => router.push("/aboutPage")}
            >
              About
            </Button>
            <Button
              bg="transparent"
              borderRadius="0"
              onClick={() => router.push("/petQuizPage")}
            >
              Pet Quiz
            </Button>
{/*             <Button
              borderRadius={"0"}
              bg="transparent"
              onClick={() => router.push("/morePage")}
            >
              More
            </Button> */}
          </Center>

          <Center>
            <Flex justifyItems="center" paddingTop={"25px"}>
              <Box p="4">
                <IconButton
                  aria-label="git hub"
                  as={AiFillGithub}
                  boxSize={8}
                  borderRadius="50px"
                  onClick={() => router.push("https://github.com/mbrady20/")}
                />
              </Box>

              <Box p="4">
                <IconButton
                  aria-label="twitter"
                  as={AiFillTwitterCircle}
                  boxSize={8}
                  borderRadius="50px"
                  onClick={() =>
                    router.push("https://twitter.com/MichaelJBrady9")
                  }
                />
              </Box>
               <Box p="4">
                  <a href="mailto:bradymichael362@gmail.com">
                <IconButton
                  aria-label="email"
                  as={AiFillMail}
                  boxSize={8}
                  borderRadius="50px"
                ></IconButton>
                </a>

              </Box> 
              <Box p="4">
                <IconButton
                  aria-label="git hub"
                  as={AiFillLinkedin}
                  boxSize={8}
                  borderRadius="50px"
                  onClick={() =>
                    router.push(
                      "https://www.linkedin.com/in/michael-brady-a34976255/"
                    )
                  }
                />
              </Box>
              <Box p="4">
                <IconButton
                  aria-label="git hub"
                  as={AiFillInstagram}
                  boxSize={8}
                  borderRadius="50px"
                  onClick={() =>
                    router.push("https://www.instagram.com/bradymichael362/")
                  }
                />
              </Box>
            </Flex>
          </Center>
        </Container>
      </Flex>
    </Container>
  );
}
