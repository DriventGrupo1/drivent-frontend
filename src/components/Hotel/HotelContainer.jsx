import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HotelComponent from './HotelComponent';
import useHotels from '../../hooks/api/useHotels';
import { SectionTitle, PageButton } from '../Dashboard/GlobalComponents';

import { toast } from 'react-toastify';
import ReservedRoom from './ReservedRoom';
import Room from './Room';
import useBooking from '../../hooks/api/useBooking';

export default function HotelContainer() {
  const { hotels, hotelError, hotelLoading } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { bookingLoading, bookingError, booking } = useBooking();

  const [type, setType] = useState('');
  const [showRooms, setShowRooms] = useState(false);
  const [tryUpdate, setTryUpdate] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userBooking, setUserBooking] = useState(null);

  function enableSelectRoom(newRooms) {
    setShowRooms(true);
    setRooms(newRooms);
    setType('create');
  }

  function changeRoom(roomId) {
    setShowRooms(true);
    setSelectedRoom(roomId);
    setType('update');
  }

  async function reserveRoom() {
    setSelectedRoom(null);
    setShowRooms(false);
    setTryUpdate(true);
    try {
      console.log(type);
      await booking(type, { roomId: selectedRoom });
      toast('Quarto reservado com sucesso!');
      await getUserBooking();
      setTryUpdate(false);
      setType('');
    } catch (error) {
      console.log(error);
      console.log(bookingError);
      setType('');
      setTryUpdate(false);
      toast('Erro ao reservar quarto!');
    }
  }

  async function getUserBooking() {
    try {
      const newUserBooking = await booking('get');
      setUserBooking(newUserBooking);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserBooking();
  }, []);

  return (
    <>
      {!userBooking && (
        <>
          {hotelLoading ? (
            <>Carregando...</>
          ) : hotelError ? (
            <SectionTitle $center={'error'}>Nenhum hotel encontrado!</SectionTitle>
          ) : (
            <HotelStyledContainer>
              <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>
              <Caixa>
                {hotels.map((hotel) => (
                  <HotelComponent
                    key={hotel.id}
                    hotelInfo={hotel}
                    enableSelectRoom={enableSelectRoom}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                  />
                ))}
              </Caixa>
            </HotelStyledContainer>
          )}
        </>
      )}
      {userBooking && (
        <>
          <SectionTitle>Você já escolheu seu quarto:</SectionTitle>
          <ReservedRoom bookingInfo={userBooking} setRooms={setRooms} />
          {!showRooms && (
            <PageButton disabled={rooms.length === 0 || tryUpdate} onClick={() => changeRoom(userBooking.Room.id)}>
              TROCAR DE QUARTO
            </PageButton>
          )}
        </>
      )}
      {showRooms && (
        <>
          <SectionTitle>Ótima pedida! Agora escolha seu quarto:</SectionTitle>
          <RoomsContainer>
            {rooms.map((room, index) => (
              <Room
                key={index}
                roomInfo={room}
                setSelectedRoom={setSelectedRoom}
                selectedRoom={selectedRoom}
                userBooking={userBooking}
              />
            ))}
          </RoomsContainer>
          <PageButton onClick={reserveRoom}>RESERVAR QUARTO</PageButton>
        </>
      )}
    </>
  );
}
const HotelStyledContainer = styled.main``;

const Caixa = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  scrollbar-color: #525252 #b3b3b390;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #b3b3b390;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #525252;
    border-radius: 15px;
  }
`;

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 35px;
  margin-bottom: 50px;
`;
