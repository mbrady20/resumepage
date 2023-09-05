import { Center, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Image } from "@chakra-ui/react";
import { query, collection, limit, getDocs, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "npm/firebase/clientApp";
import { DisplayRank, PetImage, Rank } from "npm/interfaces/answer.interface";
import { useEffect, useState } from "react";

export default function RecentResultsPage() {
  const [recentResults, setRecentResults] = useState<DisplayRank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rankConverter = {
      toFirestore(rank: Rank): DocumentData {
        return {
          initials: rank.initials,
          firstPlacePetId: rank.firstPlacePetId,
          secondPlacePetId: rank.secondPlacePetId,
          thirdPlacePetId: rank.thirdPlacePetId,
          fourthPlacePetId: rank.fourthPlacePetId,
        };
      },
      fromFirestore(snapshot: QueryDocumentSnapshot): Rank {
        const data = snapshot.data() as Rank;
        return {
          initials: data.initials,
          firstPlacePetId: data.firstPlacePetId,
          secondPlacePetId: data.secondPlacePetId,
          thirdPlacePetId: data.thirdPlacePetId,
          fourthPlacePetId: data.fourthPlacePetId,
        };
      },
    };

    const petConverter = {
      toFirestore(pet: PetImage): DocumentData {
        return { name: pet.name, url: pet.url, avgWinShare: 0, firstPlaces: 0 };
      },
      fromFirestore(snapshot: QueryDocumentSnapshot): PetImage {
        const data = snapshot.data() as PetImage;
        return { name: data.name, url: data.url, rank: 4, petId: data.petId };
      },
    };

    async function getRecentResultsData() {
      const q = query(collection(db, "ranks"), limit(4)).withConverter(rankConverter);
      const rankArray: DisplayRank[] = [];

      const snapshot = await getDocs(q);

      for (const doc of snapshot.docs) {
        const petArray: PetImage[] = [];

        const first = doc.data().firstPlacePetId;
        const second = doc.data().secondPlacePetId;
        const third = doc.data().thirdPlacePetId;
        const fourth = doc.data().fourthPlacePetId;

        const fetchPetData = async (petId: string) => {
          const petQuery = query(collection(db, "pets"), where("petId", "==", petId), limit(1)).withConverter(petConverter);
          const petDoc = (await getDocs(petQuery)).docs[0];
          return petDoc ? petDoc.data() : null;
        };

        const [firstDocData, secondDocData, thirdDocData, fourthDocData] = await Promise.all([
          fetchPetData(first),
          fetchPetData(second),
          fetchPetData(third),
          fetchPetData(fourth),
        ]);

        if (firstDocData && secondDocData && thirdDocData && fourthDocData) {
          petArray.push(firstDocData);
          petArray.push(secondDocData);
          petArray.push(thirdDocData);
          petArray.push(fourthDocData);

          const rankData: DisplayRank = {
            initials: doc.data().initials,
            pets: petArray,
          };

          rankArray.push(rankData);
        }
      }

      setRecentResults(rankArray);
      setLoading(false);
    }

    getRecentResultsData();
  }, []);


  return (
    <div>
      <Center>
        <Text height={"10vh"} paddingTop={"10px"} as="b" fontSize={"3xl"}>
          Recent pet quiz results
        </Text>
      </Center>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                    <Image src={element.pets[0]?.url} height={20} alt="first" />
                    {element.pets[0]?.name}
                  </Td>
                  <Td>
                    <Image src={element.pets[1]?.url} height={20} alt="second" />
                    {element.pets[1]?.name}
                  </Td>
                  <Td>
                    <Image src={element.pets[2]?.url} height={20} alt="third" />
                    {element.pets[2]?.name}
                  </Td>
                  <Td>
                    <Image src={element.pets[3]?.url} height={20} alt="fourth" />
                    {element.pets[3]?.name}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}