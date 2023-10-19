import { useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import { PageTitle, SectionTitle, TicketButton } from '../Dashboard/GlobalComponents';
import ErrorComponent from '../Dashboard/ErrorComponent';

export default function PaymentContainer() {
  const { ticketTypes, ticketLoading, ticketError } = useTicketTypes();
  const { enrollment } = useEnrollment();

  function getTicketValue(ticketTypes) {
    const ticketRemote = ticketTypes.find((ticketType) => ticketType.isRemote === true);
    const ticketNotRemoteWithoutHotel = ticketTypes.find(
      (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === false
    );
    const ticketNotRemoteWithHotel = ticketTypes.find(
      (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === true
    );

    return { ticketRemote, ticketNotRemoteWithoutHotel, ticketNotRemoteWithHotel };
  }

  let result = {};
  if (ticketTypes) {
    result = {
      ...getTicketValue(ticketTypes),
    };
  }

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      {!enrollment ? (
        <ErrorComponent
          errorMessage={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}
        />
      ) : ticketLoading ? (
        'Carregando...'
      ) : ticketError ? (
        <ErrorComponent errorMessage={'Falha no servidor. Tente novamente mais tarde'} />
      ) : !ticketTypes ? (
        <ErrorComponentSem errorMessage={'Tickets disponíveis. Tente novamente mais tarde'} />
      ) : (
        <>
          <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
          <TicketButton>
            <p className="ticketType">Presencial</p>
            <p className="ticketPrice">R$ {result.ticketNotRemoteWithoutHotel.price}</p>
          </TicketButton>
          <TicketButton>
            <p className="ticketType">Online</p>
            <p className="ticketPrice">R$ {result.ticketRemote.price}</p>
          </TicketButton>
        </>
      )}
    </>
  );
}
