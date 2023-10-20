import { useContext, useState } from 'react';
import styled from 'styled-components';

import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle, PageButton } from '../../../components/Dashboard/GlobalComponents';
import CardForm from '../../../components/Payment/CardForm';

export default function Checkout() {
  const { userTicket } = useContext(UserTicketContext);

  function generateTicketText() {
    if (userTicket?.TicketType.isRemote) {
      return 'Online';
    } else if (userTicket?.TicketType.includesHotel) {
      return 'Presencial + Com Hotel';
    }
    return 'Presencial + Sem Hotel';
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

    console.log("ok");
  }

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardInfo((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      <SectionTitle>Ingresso escolhido</SectionTitle>
      <TicketInfo>
        <p>{generateTicketText()}</p>
        <span>R$ {userTicket?.TicketType.price}</span>
      </TicketInfo>
      <SectionTitle>Pagamento</SectionTitle>
      <CardForm cardInfo={cardInfo} handleInputChange={handleInputChange} handleInputFocus={handleInputFocus} />
      <PageButton onClick={validateCard}>FINALIZAR PAGAMENTO</PageButton>
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
