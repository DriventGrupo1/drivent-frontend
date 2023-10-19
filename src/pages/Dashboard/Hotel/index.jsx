import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle, PageButton } from "../../../components/Dashboard/GlobalComponents";



export default function Hotel() {
  const { userTicket,userTicketError} = useContext(UserTicketContext)
  
  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      {(userTicketError)&& <SectionTitle center={"error"}>Could not connect to server. Please try again later</SectionTitle>}
      {(!userTicket)? <SectionTitle center={"error"}>Hospedagem - Não disponível</SectionTitle> : 
      (userTicket.status==="RESERVED") ? 
      <SectionTitle center={"error"}>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</SectionTitle> 
      : (userTicket.status==="PAID" && userTicket.TicketType.includesHotel===false) ? 
      <SectionTitle center={"error"}>Sua modalidade de ingresso não inclui hospedagem<br/>Prossiga para a escolha de atividades</SectionTitle> :
      <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>} 
      
    </>
  );
}