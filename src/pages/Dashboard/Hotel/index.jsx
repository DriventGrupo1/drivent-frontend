import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import ReservedRoom from '../../../components/Hotel/ReservedRoom';
import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle, PageButton } from '../../../components/Dashboard/GlobalComponents';
import Room from '../../../components/Hotel/Room';
import useBooking from '../../../hooks/api/useBooking';

export default function Hotel() {
  const { bookingLoading, bookingError, booking } = useBooking();
  const { userTicket, userTicketError } = useContext(UserTicketContext);
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userBooking, setUserBooking] = useState(null);

  function enableSelectRoom(newRooms) {
    setShowRooms(true);
    setRooms(newRooms);
  }

  async function reserveRoom() {
    setSelectedRoom(null);
    setShowRooms(false);
    try {
      await booking('create', { roomId: selectedRoom });
      toast('Quarto reservado com sucesso!');
      getUserBooking();
    } catch (error) {
      console.log(error);
      console.log(bookingError);
      toast('Erro ao reservar quarto!');
    }
  }

  async function getUserBooking() {
    try {
      const newUserBooking = await booking('get');
      console.log(newUserBooking);
      setUserBooking(newUserBooking);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(userTicket)
    getUserBooking();
  }, []);

  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      {!userTicket && <SectionTitle $center={'error'}>Hospedagem - Não disponível</SectionTitle>}
      {userTicket && !userTicket.TicketType.includesHotel && (
        <SectionTitle $center={'error'}>
          Sua modalidade de ingresso não inclui hospedagem
          <br />
          Prossiga para a escolha de atividades
        </SectionTitle>
      )}
      {userTicket && userTicket.TicketType.includesHotel && userTicket.status === 'RESERVED' && (
        <SectionTitle $center={'error'}>
          Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
        </SectionTitle>
      )}
      {userTicket && userTicket.TicketType.includesHotel && userTicket.status === 'PAID' && !userBooking && (
        <>
          <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>
          <HotelContainer enableSelectRoom={enableSelectRoom} />
        </>
      )}
      {userBooking && (
        <>
          <SectionTitle>Você já escolheu seu quarto:</SectionTitle>
          <ReservedRoom bookingInfo={userBooking} />
          <PageButton>TROCAR DE QUARTO</PageButton>
        </>
      )}
      {showRooms && (
        <>
          <SectionTitle>Ótima pedida! Agora escolha seu quarto:</SectionTitle>
          <RoomsContainer>
            {rooms.map((room, index) => (
              <Room key={index} roomInfo={room} setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} />
            ))}
          </RoomsContainer>
          <PageButton onClick={reserveRoom}>RESERVAR QUARTO</PageButton>
        </>
      )}
    </>
  );
}

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 35px;
  margin-bottom: 50px;
`;
