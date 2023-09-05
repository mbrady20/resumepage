import { Center, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Image, Button } from "@chakra-ui/react";
import { query, collection, limit, getDocs, where, type DocumentData, type QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "npm/firebase/clientApp";
import { type DisplayRank, type PetImage, type Rank } from "npm/interfaces/answer.interface";
import { useEffect, useState } from "react";

export default function RecentResultsPage(){
    const [recentResults, setRecentResults] = useState<DisplayRank[]>([]);
    const [loading, setLoading] = useState(true);

  const rankConverter = {
    toFirestore(rank: Rank): DocumentData {
      return {initials: rank.initials, firstPlacePetId: rank.firstPlacePetId, secondPlacePetId: rank.secondPlacePetId, thirdPlacePetId: rank.thirdPlacePetId, fourthPlacePetId: rank.fourthPlacePetId};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): Rank {
      const data = snapshot.data();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return {initials: data.initials, firstPlacePetId: data.firstPlacePetId, secondPlacePetId: data.secondPlacePetId, thirdPlacePetId: data.thirdPlacePetId, fourthPlacePetId: data.fourthPlacePetId};
    }
  };


  const petConverter = {
    toFirestore(pet: PetImage): DocumentData {
      return {name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0};
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot
    ): PetImage {
      const data = snapshot.data();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return {name: data.name, url: data.url, rank: 4, petId: data.petId};
    }
  };
  async function getRecentResultsData() {
    const q = query(collection(db, "ranks"), limit(4)).withConverter(rankConverter);


    const snapshot = (await getDocs(q)).docs;

    const rankArray: DisplayRank[] = []
    snapshot.forEach(async (doc) => {
      const petArray: PetImage[] = []

      const first = doc.data().firstPlacePetId;
      const second = doc.data().secondPlacePetId;
      const third = doc.data().thirdPlacePetId;
      const fourth = doc.data().fourthPlacePetId;

      const firstQuery = query(collection(db, "pets"), where("petId", "==", first), limit(1)).withConverter(petConverter);
      const firstDoc = (await getDocs(firstQuery)).docs[0]
      const firstDocData = firstDoc!.data();

      const secondQuery = query(collection(db, "pets"), where("petId", "==", second), limit(1)).withConverter(petConverter);
      const secondDoc = (await getDocs(secondQuery)).docs[0]
      const secondDocData = secondDoc!.data();
  
      const thirdQuery = query(collection(db, "pets"), where("petId", "==", third), limit(1)).withConverter(petConverter);
      const thirdDoc = (await getDocs(thirdQuery)).docs[0]
      const thirdDocData = thirdDoc!.data();
    
      const fourthQuery = query(collection(db, "pets"), where("petId", "==", fourth), limit(1)).withConverter(petConverter);
      const fourthDoc = (await getDocs(fourthQuery)).docs[0]
      const fourthDocData = fourthDoc!.data();

      petArray.push(firstDocData);
      petArray.push(secondDocData);
      petArray.push(thirdDocData);
      petArray.push(fourthDocData);
      
      const rankData: DisplayRank = {
        initials: doc.data().initials,
        pets: petArray
      };

      rankArray.push(rankData);
     } )
  
    setRecentResults(rankArray);
  }

  useEffect(() => {
    getRecentResultsData();
  },[])
    
    if(recentResults.length <= 0){
   
        return(
            <div>
            <Button onClick={getRecentResultsData}></Button>
            <div>loading...</div>
            </div>
        )
    }
    return(
        <div>
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
              <Th>First</Th>
              <Th>Second</Th>
              <Th>Third</Th>
              <Th>Fourth</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentResults.map((element) => (
              <Tr key={element.initials}>
                <Td>{element.initials}</Td>
                <Td>
                <Image src={element.pets.at(0)?.url} height={20} alt="first"/>
                  {element.pets.at(0)!.name}
                </Td>
                <Td>
                <Image src={element.pets.at(1)?.url} height={20}/>
                  {element.pets.at(1)!.name}</Td>
                <Td><Image src={element.pets.at(2)?.url} height={20}/>{element.pets.at(2)!.name}</Td>
                <Td><Image src={element.pets.at(3)?.url} height={20}/>
                  {element.pets.at(3)!.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </div>
    )
}