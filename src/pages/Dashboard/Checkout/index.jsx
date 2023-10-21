import { useContext, useState } from 'react';
import styled from 'styled-components';
import creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';

import UserTicketContext from '../../../contexts/UserTicketContext';
import usePaymentProcess from '../../../hooks/api/usePaymentProcess';
import { PageTitle, SectionTitle, PageButton } from '../../../components/Dashboard/GlobalComponents';
import CardForm from '../../../components/Payment/CardForm';
import paymentConfirmedImage from '../../../assets/images/paymentconfirmed.png';

export default function Checkout() {
  const { userTicket, userTicketLoading } = useContext(UserTicketContext);
  const { paymentProcessLoading, paymentProcessError, paymentProcess } = usePaymentProcess();

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  function generateTicketText() {
    if (userTicket.TicketType.isRemote) {
      return 'Online';
    } else if (userTicket.TicketType.includesHotel) {
      return 'Presencial + Com Hotel';
    }
    return 'Presencial + Sem Hotel';
  }

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  }

  function handleInputFocus(evt) {
    setCardInfo((prev) => ({ ...prev, focus: evt.target.name }));
  }

  async function payTicket(data) {
    try {
      await paymentProcess(data);
      userTicket.status = 'PAID';
      toast('Ticket pago com sucesso!');
    } catch (error) {
      console.log(error);
      console.log(paymentProcessError);
      toast('Erro ao pagar ticket!');
    }
  }

  function validateCard() {
    const { number, expiry, cvc, name } = cardInfo;
    const nameHasNumber = /\d/.test(name);
    const expiryPattern = /^(?:\d{4}|\d{2}\/\d{2})$/;
    const validExpiry = expiryPattern.test(expiry);

    if (!Number(number) || number.length < 13) {
      alert('Número do cartão de crédito é inválido');
      return;
    }
    if (nameHasNumber || name.length < 5) {
      alert('Nome do cartão de crédito é inválido');
      return;
    }
    if (!validExpiry) {
      alert('Data de expiração do cartão de crédito é inválida');
      return;
    }
    if (!Number(cvc) || cvc.length < 3) {
      alert('Código de segurança do cartão de crédito é inválido');
      return;
    }

    payTicket({
      ticketId: userTicket.id,
      cardData: {
        number,
        expirationDate: expiry,
        cvv: cvc,
        name,
        issuer: creditCardType(number)[0].type,
      },
    });
  }

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      <SectionTitle>Ingresso escolhido</SectionTitle>

      {!userTicket || userTicketLoading ? (
        'loading'
      ) : (
        <>
          <TicketInfo>
            <p>{generateTicketText()}</p>
            <span>R$ {userTicket.TicketType.price}</span>
          </TicketInfo>
          <SectionTitle>Pagamento</SectionTitle>
          {userTicket.status !== 'PAID' && (
            <>
              <CardForm cardInfo={cardInfo} handleInputChange={handleInputChange} handleInputFocus={handleInputFocus} disabled={paymentProcessLoading}/>
              <PageButton onClick={validateCard} disabled={paymentProcessLoading}>
                FINALIZAR PAGAMENTO
              </PageButton>
            </>
          )}
          {userTicket.status === 'PAID' && (
            <Confirmed>
              <img src={paymentConfirmedImage} />
              <div>
                <h4>Pagamento confirmado!</h4>
                <p>
                  Prossiga para escolha de
                  {userTicket.TicketType.includesHotel ? ' hospedagem e atividades' : ' atividades'}
                </p>
              </div>
            </Confirmed>
          )}
        </>
      )}
    </>
  );
}

const TicketInfo = styled.div`
  width: 290px;
  height: 108px;
  background-color: #ffeed2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  justify-content: center;
  text-align: center;

  p {
    font-size: 16px;
    color: #454545;
    margin-bottom: 10px;
  }

  span {
    font-size: 14px;
    color: #898989;
  }
`;

const Confirmed = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  font-size: 16px;
  color: #454545;
  gap: 15px;
  align-items: center;

  h4 {
    font-weight: 700;
    margin-bottom: 5px;
  }
`;
