import styled from "styled-components"

export default function HotelComponent(){
    return(
        <HotelContainer>
            <img src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=" alt="" />
            <HotelInfo>
                <HotelName>Driven Resort</HotelName>
                <RoomTypes>Tipos de acomodação:</RoomTypes>
                <Info>Single e Double</Info>
                <VagasDisponiveis>Vagas disponíveis:</VagasDisponiveis>
                <Info>103</Info>
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