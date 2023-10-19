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
      <CardForm cardInfo={cardInfo} handleInputChange={handleInputChange} handleInputFocus={handleInputFocus}/>
      <PageButton>FINALIZAR PAGAMENTO</PageButton>
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
