import styled from 'styled-components';

export default function ReservedRoom(props) {
  const { bookingInfo } = props;
  const hotelInfo = bookingInfo.Room.Hotel;

  let roomType = '';
  if (bookingInfo.Room.capacity === 1) {
    roomType = 'Single';
  } else if (bookingInfo.Room.capacity === 2) { 
    roomType = 'Double' 
  } else {
    roomType = 'Triple';
  }

  return (
    <HotelContainer>
      <img src={hotelInfo.image} alt="" />
      <HotelInfo>
        <HotelName>{hotelInfo.name}</HotelName>
        <Room>Quarto reservado</Room>
        <Info>{bookingInfo.Room.name} ({roomType})</Info>
        <People>Pessoas no seu quarto</People>
        <Info>Você{bookingInfo.bookings === 1? '' : ` e mais ${bookingInfo.bookings-1}`}</Info>
      </HotelInfo>
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  height: 264px;
  width: 196px;
  border-radius: 10px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background-color: #FFEED2;
  margin-bottom: 35px;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
`;

const HotelInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 168px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #3c3c3c;
`;

const HotelName = styled.p`
  color: #343434;
  font-size: 20px;
  font-weight: 400;
`;

const Room = styled.p`
  margin-top: 13px;
  font-weight: 700;
`;

const Info = styled.p`
  margin-top: 2px;
  font-weight: 400;
`;

const People = styled.p`
  margin-top: 16px;
  font-weight: 700;
`;
