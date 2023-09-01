import { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { db, storage } from "npm/firebase/clientApp";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@chakra-ui/button";
import { Container, Input, Image, Center, Text, IconButton } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { CloseIcon } from "@chakra-ui/icons";


export default function FileUpload() {
  const [input, setInput] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>();
  const [imageDisplayUrl, setImageDisplayUrl] = useState<string | null>();
  const [imageRef, setImageRef] = useState<StorageReference | null>(null);
  const [imageList, setImageList] = useState<string[]>();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [textInputVal, setTextInputVal] = useState("");
  const [imagePreviewed, setImagePreviewed] = useState(false);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    else if (!e.target.files[0]) return;
    setInput(e.target.files[0]);
  };
  const uploadImage = () => {
    if (input == null) return;
    var tempName = input.name + uuidv4();
    

    var tempRef = (ref(storage, `${tempName}`));
    if (tempRef) {
      uploadBytes(tempRef, input);
    }

    setImageRef(tempRef);
    setImageName(tempName);
    setImageUploaded(true);
  };

  const getImagePreview = async () => {
    if (imageRef) {setImageDisplayUrl(await getDownloadURL(imageRef));
        setImagePreviewed(true);
    }
  };

  const submitPet = async () => {
    if (imageRef) setImageDisplayUrl(await getDownloadURL(imageRef));

    const docRef = await addDoc(collection(db, "pets"), {
      name: `${textInputVal.charAt(0).toLocaleUpperCase() + textInputVal.slice(1)}`,
      url: `${imageDisplayUrl}`,
      avgWinShare: 0,
      firstPlaces: 0,
      petId: uuidv4(),
      roundsPlayed: 0
    });
  };

  const closeButton = () => {
    setImageDisplayUrl("");
    setImagePreviewed(false);
  }
  return (
    <Container>
        <Center>
      <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>Add your pet to the quiz!</Text>
      </Center>
<Container bg="gray.100" height="50vh" >
   {imagePreviewed && <IconButton aria-label={""} bg="red.300" icon={<CloseIcon/>} onClick={closeButton}></IconButton>}
        <Container bg="gray.100" height="45vh" centerContent justifyContent={"center"}>
     
          {imageDisplayUrl && (
            <Image
              src={imageDisplayUrl}
              width={200}
              maxHeight={350}
              minHeight={275}
            />
          )}
          {!imageDisplayUrl && imageUploaded && (
            <Button onClick={getImagePreview}>Image Preview?</Button>
          )}
  
        </Container>
        </Container>

      <Input type="file" onChange={onInputChangeHandler} />
      <Center>
      <Button onClick={uploadImage}>Upload Image</Button>
      </Center>
      <Input
        type="text"
        onChange={(e) => setTextInputVal(e.target.value)}
        value={textInputVal}
        placeholder="Your Pet's Name"
      />
      <Center>
      <Button onClick={submitPet}>Submit Pet</Button>
      </Center>
    </Container>
  );
}
