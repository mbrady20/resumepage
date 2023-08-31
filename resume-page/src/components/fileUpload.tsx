import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage";
import { db, storage } from "npm/firebase/clientApp";
import { v4 as uuidv4} from 'uuid';
import { Button } from "@chakra-ui/button";
import { Container, Input, Image, Center } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";

export default function FileUpload() {

    const [input, setInput] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string | null>();
    const [imageDisplayUrl, setImageDisplayUrl]= useState<string | null>();
    const [imageRef, setImageRef] = useState<StorageReference | null>(null);
    const[imageList, setImageList] = useState<string[]>();
    const[imageUploaded, setImageUploaded] = useState(false);
    const [textInputVal, setTextInputVal] = useState("");
    const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(!e.target.files)
        return;
    else if(!e.target.files[0])
        return;
        setInput(e.target.files[0]);
    }
     const uploadImage = () => {
        if (input == null) return;
        setImageName(input.name + uuidv4());
        setImageRef(ref(storage, `${imageName}`));
        if(imageRef){
            uploadBytes(imageRef, input);
            

    };
    setImageUploaded(true);
}

const getImagePreview = async () => {
    if(imageRef)
        setImageDisplayUrl(await getDownloadURL(imageRef));
}
 
const submitPet = async () => {
    if(imageRef)
    setImageDisplayUrl(await getDownloadURL(imageRef));

    const docRef = await addDoc(collection(db, "pets"), {
        name: `${textInputVal}`,
        url: `${imageDisplayUrl}`,
        avgWinShare: 0,
        firstPlaces: 0, 
        petId: uuidv4()
    })
}

    return (
        <Container>
            
            {imageDisplayUrl && 
            <Image src={imageDisplayUrl} height={150} width={80}/>
} 
{!imageDisplayUrl && imageUploaded && <Button onClick={getImagePreview}>Image Preview?</Button>}
          
            <Input type="file" onChange={onInputChangeHandler}/>
            <Button onClick={uploadImage}>Upload Image</Button>
            <Input type="text" onChange={(e) => setTextInputVal(e.target.value)} value={textInputVal}/>
            <Button onClick={submitPet}>Submit Pet</Button>
        </Container>
    );
  }