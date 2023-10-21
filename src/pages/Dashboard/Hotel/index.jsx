import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HotelContainer from '../../../components/Hotel/HotelContainer';
import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle } from "../../../components/Dashboard/GlobalComponents";

export default function Hotel() {
  const { userTicket,userTicketError} = useContext(UserTicketContext)

  // mock para testar os casos possíveis
/*   const userTicket = {
    status: "PAID",
    TicketType: {
      includesHotel: true        
    }
  }
  const userTicketError = null */
  
  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      {(userTicketError) ? <SectionTitle $center={"error"}>Não foi possível se conectar ao servidor. Por favor tente novamente mais tarde</SectionTitle>:
      (!userTicket)? <SectionTitle $center={"error"}>Hospedagem - Não disponível</SectionTitle> : 
      (userTicket.status==="RESERVED") ? 
      <SectionTitle $center={"error"}>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SectionTitle> 
      : (userTicket.status==="PAID" && userTicket.TicketType.includesHotel===false) ? 
      <SectionTitle $center={"error"}>Sua modalidade de ingresso não inclui hospedagem<br/>Prossiga para a escolha de atividades</SectionTitle> :
      (<>
        <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>
        <HotelContainer/>
      </>)} 
    </>
  );
}
