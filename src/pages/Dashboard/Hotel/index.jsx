import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import HotelContainer from '../../../components/Hotel/HotelContainer';
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
    } catch (error) {
      console.log(error);
      console.log(bookingError);
      toast('Erro ao reservar quarto!');
    }
  }

  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      {!userTicket ? (
        <SectionTitle $center={'error'}>Hospedagem - Não disponível</SectionTitle>
      ) : userTicket.TicketType.includesHotel === false ? (
        <SectionTitle $center={'error'}>
          Sua modalidade de ingresso não inclui hospedagem
          <br />
          Prossiga para a escolha de atividades
        </SectionTitle>
      ) : userTicket.status === 'RESERVED' ? (
        <SectionTitle $center={'error'}>
          Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
        </SectionTitle>
      ) : (
        <>
          <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>
          <HotelContainer enableSelectRoom={enableSelectRoom} />
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
