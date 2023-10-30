import { useContext } from 'react';

import HotelContainer from '../../../components/Hotel/HotelContainer';

import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle } from '../../../components/Dashboard/GlobalComponents';
import UserContext from '../../../contexts/UserContext';

export default function Hotel() {
  const { userTicket, userTicketError } = useContext(UserTicketContext);
  const { userData } = useContext(UserContext);
  console.log(userTicket, userData);
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
      {userTicket && userTicket.TicketType.includesHotel && userTicket.status === 'PAID' && <HotelContainer />}
    </>
  );
}
