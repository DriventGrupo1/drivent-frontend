import { useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import { PageButton, PageTitle, SectionTitle, TicketButton } from '../Dashboard/GlobalComponents';
import ErrorComponent from '../Dashboard/ErrorComponent';

export default function PaymentContainer() {
  const { ticketTypes, ticketLoading, ticketError } = useTicketTypes();
  const { enrollment } = useEnrollment();
  const [notRemoteOptionClicked, setNotRemoteOptionClicked] = useState(0);
  const [remoteOptionClicked, setRemoteOptionClicked] = useState(0);
  const [notRemoteWithoutHotelOptionClicked, setNotRemoteWithoutHotelOptionClicked] = useState(0);
  const [notRemoteWithHotelOptionClicked, setNotRemoteWithHotelOptionClicked] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState({});
  const [ticketPrice, setTicketPrice] = useState(0);

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

  function markRemoteOrNotRemoteOption(e) {
    //console.log(e.target);
    if (e.target.firstChild.innerText === 'Presencial') {
      setNotRemoteOptionClicked(1);
      setRemoteOptionClicked(0);
    } else if (e.target.firstChild.innerText === 'Online') {
      setRemoteOptionClicked(1);
      setNotRemoteOptionClicked(0);
      setTicketTypeId({
        ticketTypeId: result.ticketRemote.id,
      });
      setTicketPrice(result.ticketRemote.price);
    }
  }

  function markWithoutHotelOrWithHotelOption(e) {
    //console.log(e.target);
    if (e.target.firstChild.innerText === 'Sem Hotel') {
      setNotRemoteWithoutHotelOptionClicked(1);
      setNotRemoteWithHotelOptionClicked(0);
      setTicketTypeId({
        ticketTypeId: result.ticketNotRemoteWithoutHotel.id,
      });
      setTicketPrice(result.ticketNotRemoteWithoutHotel.price);
    } else if (e.target.firstChild.innerText === 'Com Hotel') {
      setNotRemoteWithHotelOptionClicked(1);
      setNotRemoteWithoutHotelOptionClicked(0);
      setTicketTypeId({
        ticketTypeId: result.ticketNotRemoteWithHotel.id,
      });
      setTicketPrice(result.ticketNotRemoteWithHotel.price);
    }
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
        <ErrorComponent errorMessage={'Tickets indisponíveis. Tente novamente mais tarde'} />
      ) : (
        <>
          <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
          <TicketButton onClick={markRemoteOrNotRemoteOption} clicked={notRemoteOptionClicked}>
            <p className="ticketType">Presencial</p>
            <p className="ticketPrice">R$ {result.ticketNotRemoteWithoutHotel.price}</p>
          </TicketButton>
          <TicketButton onClick={markRemoteOrNotRemoteOption} clicked={remoteOptionClicked}>
            <p className="ticketType">Online</p>
            <p className="ticketPrice">R$ {result.ticketRemote.price}</p>
          </TicketButton>
          {notRemoteOptionClicked ? (
            <>
              <SectionTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SectionTitle>
              <TicketButton onClick={markWithoutHotelOrWithHotelOption} clicked={notRemoteWithoutHotelOptionClicked}>
                <p className="ticketType">Sem Hotel</p>
                <p className="ticketPrice">+ R$ 0</p>
              </TicketButton>
              <TicketButton onClick={markWithoutHotelOrWithHotelOption} clicked={notRemoteWithHotelOptionClicked}>
                <p className="ticketType">Com Hotel</p>
                <p className="ticketPrice">
                  + R$ {result.ticketNotRemoteWithHotel.price - result.ticketNotRemoteWithoutHotel.price}
                </p>
              </TicketButton>
              {notRemoteWithoutHotelOptionClicked || notRemoteWithHotelOptionClicked ? (
                <>
                  <SectionTitle>
                    Fechado! O total ficou em <strong>R$ {ticketPrice}</strong> . Agora é só confirmar:
                  </SectionTitle>
                  <PageButton>RESERVAR INGRESSO</PageButton>
                </>
              ) : (
                <></>
              )}
            </>
          ) : remoteOptionClicked ? (
            <>
              <SectionTitle>
                Fechado! O total ficou em <strong>R$ {ticketPrice}</strong> . Agora é só confirmar:
              </SectionTitle>
              <PageButton>RESERVAR INGRESSO</PageButton>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
