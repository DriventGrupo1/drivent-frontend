import styled from "styled-components"
import HotelComponent from "./HotelComponent"
import useHotels from "../../hooks/api/useHotels"

export default function HotelContainer(){

  const { hotels } = useHotels()

  console.log(hotels)

  if(!hotels){
    return(
      <Caixa>
        Nenhum hotel Encontrado!
      </Caixa>
    )
  }

  return (
  <Caixa>
    {hotels.map((hotel)=> <HotelComponent key={hotel.id} hotelInfo={hotel}/>)}
  </Caixa>
  )
}


const Caixa = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
`