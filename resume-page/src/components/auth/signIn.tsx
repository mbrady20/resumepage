import { Box, Button, Center, Container, FormControl, FormErrorMessage, Text, FormLabel, Input, VStack, Flex } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { auth } from "npm/firebase/clientApp";


export default function SignIn(){

    
      return (

  
        <Container alignContent={"center"}>
<Center>
        <Text height={"10vh"} paddingTop={"40px"} as="b" fontSize={"3xl"}>Sign in to add your pet to the Pet Quiz!</Text>
        </Center>
        <Center paddingTop={"20px"}>
        <Box bg="gray.100" rounded="md" width={"20vw"} >
          <Formik initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values) => signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
            }).catch((error: Error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })}>
            {({ handleSubmit, errors, touched}) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} alignItems={"flex-start"}>
                  <FormControl>
                    <FormLabel htmlFor="email" >Email Address</FormLabel>
                    <Field as={Input} id="email" name="email" type="email" placeholder="johndoe@email.com"/>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                      <Field as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      validate={(value: string) => {
                        if(value.length <= 8){
                          return "Password should be over 8 characters"
                        }
                      }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" width={"full"} colorScheme={"green"}>Sign In</Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
        </Center>
     </Container>

      )
    }