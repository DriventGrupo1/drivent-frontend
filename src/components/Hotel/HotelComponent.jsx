import styled from 'styled-components';
import useHotelById from '../../hooks/api/useHotelById';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HotelComponent(props) {
  const { hotelInfo, enableSelectRoom, selectedHotel, setSelectedHotel } = props;
  const { hotelById, hotelByIdLoading, hotelByIdError } = useHotelById(hotelInfo.id);
  const [roomTypes, setRoomTypes] = useState('');
  const [availableRooms, setAvailableRooms] = useState(0);
  const [rooms, setRooms] = useState([]);

  function selectHotel() {
    enableSelectRoom(rooms);
    setSelectedHotel(hotelInfo.id);
  }

  useEffect(() => {
    function getRooms() {
      const newRooms = hotelById.Rooms;
      setRooms(newRooms);
      if (newRooms.length === 0) {
        setRoomTypes('-');
        setAvailableRooms(0);
      } else {
        const types = [];

        setAvailableRooms(hotelById.available);
        if (newRooms.find((element) => element.capacity === 1)) types.push('Single');
        if (newRooms.find((element) => element.capacity === 2)) types.push('Double');
        if (newRooms.find((element) => element.capacity === 3)) types.push('Triple');

        setRoomTypes(types.join(', '));
      }
    }
    if (!hotelByIdLoading) {
      getRooms();
    }
  }, [hotelByIdLoading]);

  return (
    <>
      {hotelByIdError ? (
        'erro'
      ) : (
        <HotelContainer onClick={selectHotel} $selected={selectedHotel === hotelInfo.id}>
          <img src={hotelInfo.image} alt="" />
          <HotelInfo>
            <HotelName>{hotelInfo.name}</HotelName>
            <RoomTypes>Tipos de acomodação:</RoomTypes>
            <Info>{roomTypes}</Info>
            <VagasDisponiveis>Vagas disponíveis:</VagasDisponiveis>
            <Info>{availableRooms}</Info>
          </HotelInfo>
        </HotelContainer>
      )}
    </>
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
  cursor: pointer;
  flex-shrink: 0;
  background-color: ${(props) => (props.$selected ? '#FFEED2' : '#ebebeb')};

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

const RoomTypes = styled.p`
  margin-top: 13px;
  font-weight: 700;
`;

const Info = styled.p`
  margin-top: 2px;
  font-weight: 400;
`;

const VagasDisponiveis = styled.p`
  margin-top: 16px;
  font-weight: 700;
`;
