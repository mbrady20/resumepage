import { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { Button, Center } from "@chakra-ui/react";



export default function SignInOrUp() {

    const [pageState, setPageState] = useState(false);

    function setSignUpPage() {
        setPageState(true);
    }
    function setSignInPage() {
        setPageState(false);
    }
return(
    <div>
   {!pageState && <SignIn></SignIn>}
   {!!pageState && <SignUp></SignUp>}
   <Center>
   {!pageState && <Button onClick={setSignUpPage}>Sign up instead</Button>}
   {!!pageState && <Button onClick={setSignInPage}>Sign in instead</Button>}
   </Center>
    </div>
)    

};