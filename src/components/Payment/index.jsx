import { useEffect, useState } from 'react';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import { PageButton, PageTitle, SectionTitle, TicketButton } from '../Dashboard/GlobalComponents';
import ErrorComponent from '../Dashboard/ErrorComponent';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUserTicket from '../../hooks/api/useUserTicket';

export default function PaymentContainer() {
  const { ticket, ticketLoading, ticketError } = useUserTicket();
  const { ticketTypes, ticketTypesLoading, ticketTypesError } = useTicketTypes();
  const { savedTicketLoading, savedTicketError, saveUserTicket } = useSaveTicket();
  const { enrollment, enrollmentLoading } = useEnrollment();
  const [notRemoteOptionClicked, setNotRemoteOptionClicked] = useState(false);
  const [remoteOptionClicked, setRemoteOptionClicked] = useState(false);
  const [notRemoteWithoutHotelOptionClicked, setNotRemoteWithoutHotelOptionClicked] = useState(false);
  const [notRemoteWithHotelOptionClicked, setNotRemoteWithHotelOptionClicked] = useState(false);
  const [ticketTypeId, setTicketTypeId] = useState({});
  const [ticketPrice, setTicketPrice] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (ticket) {
      navigate('/dashboard/payment/checkout');
    }
  }, [ticket]);

  async function handleSubmit(body) {
    setButtonState(true);
    try {
      await saveUserTicket(body);
      toast('Ticket reservado com sucesso!');
      navigate('/dashboard/payment/checkout');
    } catch (error) {
      console.log(error);
      toast('Erro ao reservar ticket!');
      setButtonState(false);
    }
  }

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

  function markRemoteOrNotRemoteOption(type) {
    if (type === 'Presencial') {
      setNotRemoteOptionClicked(true);
      setRemoteOptionClicked(false);
    } else if (type === 'Online') {
      setRemoteOptionClicked(true);
      setNotRemoteOptionClicked(false);
      setTicketTypeId({
        ticketTypeId: result.ticketRemote.id,
      });
      setTicketPrice(result.ticketRemote.price);
    }
  }

  function markWithoutHotelOrWithHotelOption(type) {
    if (type === 'Sem Hotel') {
      setNotRemoteWithoutHotelOptionClicked(true);
      setNotRemoteWithHotelOptionClicked(false);
      setTicketTypeId({
        ticketTypeId: result.ticketNotRemoteWithoutHotel.id,
      });
      setTicketPrice(result.ticketNotRemoteWithoutHotel.price);
    } else if (type === 'Com Hotel') {
      setNotRemoteWithHotelOptionClicked(true);
      setNotRemoteWithoutHotelOptionClicked(false);
      setTicketTypeId({
        ticketTypeId: result.ticketNotRemoteWithHotel.id,
      });
      setTicketPrice(result.ticketNotRemoteWithHotel.price);
    }
  }

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      {enrollmentLoading ? (
        'Carregando...'
      ) : !enrollment ? (
        <ErrorComponent
          errorMessage={'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso'}
        />
      ) : ticketTypesLoading ? (
        'Carregando...'
      ) : ticketTypesError ? (
        <ErrorComponent errorMessage={'Falha no servidor. Tente novamente mais tarde'} />
      ) : !ticketTypes ? (
        <ErrorComponent errorMessage={'Tickets indisponíveis. Tente novamente mais tarde'} />
      ) : (
        <>
          <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
          <TicketButton
            onClick={() => markRemoteOrNotRemoteOption('Presencial')}
            $clicked={notRemoteOptionClicked}
            disabled={buttonState}
          >
            <p className="ticketType">Presencial</p>
            <p className="ticketPrice">R$ {result.ticketNotRemoteWithoutHotel.price}</p>
          </TicketButton>
          <TicketButton
            onClick={() => markRemoteOrNotRemoteOption('Online')}
            $clicked={remoteOptionClicked}
            disabled={buttonState}
          >
            <p className="ticketType">Online</p>
            <p className="ticketPrice">R$ {result.ticketRemote.price}</p>
          </TicketButton>
          {notRemoteOptionClicked ? (
            <>
              <SectionTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SectionTitle>
              <TicketButton
                onClick={() => markWithoutHotelOrWithHotelOption('Sem Hotel')}
                $clicked={notRemoteWithoutHotelOptionClicked}
                disabled={buttonState}
              >
                <p className="ticketType">Sem Hotel</p>
                <p className="ticketPrice">+ R$ 0</p>
              </TicketButton>
              <TicketButton
                onClick={() => markWithoutHotelOrWithHotelOption('Com Hotel')}
                $clicked={notRemoteWithHotelOptionClicked}
                disabled={buttonState}
              >
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
                  <PageButton onClick={() => handleSubmit(ticketTypeId)} disabled={buttonState}>
                    RESERVAR INGRESSO
                  </PageButton>
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
              <PageButton onClick={() => handleSubmit(ticketTypeId)} disabled={buttonState}>
                RESERVAR INGRESSO
              </PageButton>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
