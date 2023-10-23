import { useContext, useState } from 'react';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle } from '../../../components/Dashboard/GlobalComponents';

export default function Hotel() {
  const { userTicket, userTicketError } = useContext(UserTicketContext);

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
          <HotelContainer />
        </>
      )}
    </>
  );
}
