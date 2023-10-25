import { useContext } from "react";
import UserTicketContext from "../../../contexts/UserTicketContext";
import { PageTitle, SectionTitle } from "../../../components/Dashboard/GlobalComponents";
import ErrorComponent from "../../../components/Dashboard/ErrorComponent";
import styled from "styled-components";
import Day from "../../../components/Activity/Day";
import EventInfoContext from "../../../contexts/EventInfoContext";
import useActivtiesByEventId from "../../../hooks/api/useActivitiesByEventId";
import dayjs from "dayjs";

export default function Activities() {
  const { userTicket, userTicketError } = useContext(UserTicketContext)
  const { eventInfo } = useContext(EventInfoContext)
  const { activitiesByEventId, activitiesByEventIdError, activitiesByEventIdLoading } = useActivtiesByEventId(eventInfo.id)

  const datas = []

  if(!activitiesByEventIdLoading){
    activitiesByEventId.forEach(element => {
      if(!datas.includes(dayjs(element.date).format('YYYY-MM-DD'))) {
        datas.push(dayjs(element.date).format('YYYY-MM-DD'))
      }
    });
  }

  console.log(datas)

  return (
    <>
      <PageTitle>Escolha de atividades</PageTitle>
      {(!userTicket || userTicket.status === "RESERVED")?
      <ErrorComponent errorMessage={"Você precisa ter confirmado pagamento antes de fazer a escolha de atividades"}></ErrorComponent>
      :(userTicket.TicketType.isRemote)?
      <ErrorComponent errorMessage={"Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades."}></ErrorComponent>
      :(<>
        <SectionTitle>Primeiro, filtre pelo dia do evento:</SectionTitle>
        <DaysContainer>
          {datas.map((element, index)=><Day key={index} data={element}></Day>)}
        </DaysContainer>
      </>)}
    </>
  )
}

const DaysContainer = styled.div`
  display: flex;
  gap: 0 17px;
`
