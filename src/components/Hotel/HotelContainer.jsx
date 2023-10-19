import styled from "styled-components"
import HotelComponent from "./HotelComponent"

export default function HotelContainer(){
    return (
    <Caixa>
        <HotelComponent></HotelComponent>
        <HotelComponent></HotelComponent>
        <HotelComponent></HotelComponent>
    </Caixa>
    )
}


const Caixa = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
`