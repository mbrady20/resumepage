"use client";
import {
  Container,
  Text,
  Image,
  Center,
  Flex,
  Card,
  CardHeader,
  Heading,
  SimpleGrid,
  CardBody,
  Stack,
  StackDivider,
  Box,
} from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Container maxWidth={"20xl"}>
      <Container>
        <Center padding="20px">
          <Text fontSize={"50px"} as="b" align="center">
            Junior at University of Wisconsin
          </Text>
        </Center>

        <Center paddingTop={"10px"}>
          <Text fontSize={"20px"} color="gray.500">
            Check out my{" "}
            <Text as="u" color="black">
              <a href="https://www.instagram.com/bradymichael362/">Instagram</a>
            </Text>
          </Text>
        </Center>

        <Container paddingY="20px">
          <Text fontSize={"20px"} color="gray.500">
            During my free time I enjoy practing Jiu Jitsu, playing Super Smash
            Brothers Melee and spending time with friends and family
          </Text>
        </Container>
      </Container>
      <Container paddingY={"20px"} centerContent={true}>
        <Text align={"center"} fontSize={"40px"} as="b">
          Educational Experience
        </Text>
      </Container>
      <Container maxWidth={"6xl"}>
        <SimpleGrid columns={2} spacing={"20px"}>
          <Card bg="red.100">
            <CardHeader>
              <Flex>
                <Box>
                  <Heading>University of Wisconsin-Madison</Heading>
                </Box>
                
                <Box>
                  <Image src="wisco2.png" htmlWidth={"275px"} alt="wisconsin"/>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Text>At the University of Wisconsin I&apos;m majoring in Math, Computer Science and Philosophy.</Text>

                  <Text>During my free time I go to Badger games with my friends, practice at the Jiu Jitsu club and game at the Super Smash Bros. club.</Text>
                </Stack>
              </CardBody>
            </CardBody>
          </Card>
          <Card bg="green.100">
            <CardHeader>
              <Flex>
                <Box>
                  <Heading>Raritan Valley Community College</Heading>
                </Box>
                <Box>
                  <Center>
                    <Image
                      src="rvcc.png"
                      borderRadius={"45%"}
                      htmlWidth={"150px"}
                      alt="RVCC"
                    />
                  </Center>
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Text>During my gap year I took classes at RVCC in Chemistry and Computer Science.</Text>

                  <Text>During my time here I discovered my love for Computer Science.</Text>
                </Stack>
              </CardBody>
          </Card>

          <Card bg="blue.100">
            <CardHeader>
              <Flex>
                <Box>
                  <Heading>Washington and Lee University</Heading>
                </Box>
                <Box>
                  <Image src="WAndL.png" htmlWidth={"150px"} alt="Washington and Lee"/>
                </Box>
              </Flex>
              <CardBody>
              <br></br>
                <Stack divider={<StackDivider />} spacing="4">
                  
                  <Text>I spent my first year of college at Washington and Lee University. During my time there I was a varsity wrestler and physics major.</Text>

                  <Text>I transferred from Washington and Lee in search of a bigger school with more extracurricular opportunities.</Text>
                </Stack>
              </CardBody>
            </CardHeader>
          </Card>
          <Card bg="red.100">
            <CardHeader>
              <Flex>
                <Box>
                  <Heading>The Lawrenceville School </Heading>
                </Box>

                <Box>
                  <Image src="lville.jpeg" borderRadius={"50%"} alt="Lawrenceville" />
                </Box>
              </Flex>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Text>
                  During my time at the Lawrenceville School I received a world
                  class education.
                </Text>

                <Text>
                  Using the Harkness method I learned to collaborate with my
                  peers to further my own understanding and to work to better
                  the understanding of the group.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </Container>
  );
}
