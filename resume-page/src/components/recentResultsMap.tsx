import { Tbody, Tr, Td, Image } from "@chakra-ui/react";
import { DisplayRank } from "npm/interfaces/answer.interface";
import { useEffect } from "react";


export default function RecentResultsMap(props: DisplayRank[]){

    return(
        <Tbody>
        {props?.map((element) => (
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
    )

}