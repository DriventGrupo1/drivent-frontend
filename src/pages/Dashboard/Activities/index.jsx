import { useContext } from "react";
import UserTicketContext from "../../../contexts/UserTicketContext";
import { PageTitle, SectionTitle } from "../../../components/Dashboard/GlobalComponents";
import ErrorComponent from "../../../components/Dashboard/ErrorComponent";

export default function Activities() {
  const { userTicket, userTicketError } = useContext(UserTicketContext)

  return (
    <>
      <PageTitle>Escolha de atividades</PageTitle>
      {(!userTicket || userTicket.status === "RESERVED")?
      <ErrorComponent errorMessage={"Você precisa ter confirmado pagamento antes de fazer a escolha de atividades"}></ErrorComponent>
      :(userTicket.TicketType.isRemote)?
      <ErrorComponent errorMessage={"Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."}></ErrorComponent>
      :<></>}
    </>
  )
}
