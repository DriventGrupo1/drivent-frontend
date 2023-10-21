import styled from "styled-components"
import useHotelById from "../../hooks/api/useHotelById"
import { useEffect, useState } from "react"

export default function HotelComponent(props){

    const {hotelInfo} = props
    const { getHotelById, hotelById} = useHotelById()
    const [roomTypes, setRoomTypes] = useState("")
    const [availableRooms, setAvailableRooms] = useState(0)

    useEffect(()=>{



        async function getHotels (){
            try {
                const response = await getHotelById(hotelInfo.id)
                return response
            } catch (error) {
                console.log(error)
            }
        }

        async function getRooms (){
            const retorno = await getHotels()
            const newRooms = retorno.Rooms
            if(newRooms.length === 0){
                setRoomTypes("-")
                setAvailableRooms(0)
            }else{
                const types = []
        
                setAvailableRooms(retorno.available)
                if(newRooms.find((element)=> element.capacity === 1)) types.push("Single")
                if(newRooms.find((element)=> element.capacity === 2)) types.push("Double")
                if(newRooms.find((element)=> element.capacity === 3)) types.push("Triple")
        
                setRoomTypes(types.join(', '))
            }
        }

        getRooms()
    }, [])

    return(
        <HotelContainer>
            <img src={hotelInfo.image} alt="" />
            <HotelInfo>
                <HotelName>{hotelInfo.name}</HotelName>
                <RoomTypes>Tipos de acomodação:</RoomTypes>
                <Info>{roomTypes}</Info>
                <VagasDisponiveis>Vagas disponíveis:</VagasDisponiveis>
                <Info>{availableRooms}</Info>
            </HotelInfo>
        </HotelContainer>
    )
}

const HotelContainer = styled.div`
    height: 264px;
    width: 196px;
    background-color: #EBEBEB;
    border-radius: 10px;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 168px;
        height: 109px;
        border-radius: 5px;
    }
    flex-shrink: 0;
`

const HotelInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 168px;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    color: #3C3C3C;
`

const HotelName = styled.p`
    color: #343434;
    font-size: 20px;
    font-weight: 400;
`

const RoomTypes = styled.p`
    margin-top: 10px;
    font-weight: 700;
`

const Info = styled.p`
    margin-top: 2px;
    font-weight: 400;
`

const VagasDisponiveis = styled.p`
    margin-top: 14px;
    font-weight: 700;
`