import { GridItem, Center } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import SignInOrUp from "npm/components/auth/signInOrUp";
import FileUpload from "npm/components/fileUpload";
import { auth } from "npm/firebase/clientApp";
import { Pet } from "npm/interfaces/answer.interface";
import { useState } from "react";

export default function CreateAPetPage() {

    const [userPet, setUserPet] = useState<Pet | null>();
    const [userId, setUserId] = useState<string>("");
    const [signedIn, setSignedIn] = useState(false);
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          setSignedIn(true);
          setUserId(uid);

          
          // ...
        } else {
          // User is signed out
          setSignedIn(false);
          setUserPet(null);
        }
      });
      
    return(
        <GridItem colSpan={9} height={"100vh"} bg="green.50">
        <Center>
          {!signedIn && <SignInOrUp/>}
          {!!signedIn && <FileUpload userId={userId}/>}
          </Center>
      </GridItem>
    )
}