import { useContext, useEffect, useState } from 'react';
import UserTicketContext from '../../../contexts/UserTicketContext';
import { PageTitle, SectionTitle } from '../../../components/Dashboard/GlobalComponents';
import ErrorComponent from '../../../components/Dashboard/ErrorComponent';
import styled from 'styled-components';
import Day from '../../../components/Activity/Day';
import EventInfoContext from '../../../contexts/EventInfoContext';
import useActivtiesByEventId from '../../../hooks/api/useActivitiesByEventId';
import dayjs from 'dayjs';
import utc from 'dayjs-plugin-utc';
import ActivitiesColumn from '../../../components/Activity/Activities';

dayjs.extend(utc);

export default function Activities() {
  const { userTicket, userTicketError } = useContext(UserTicketContext);
  const { eventInfo } = useContext(EventInfoContext);
  const { activitiesByEventId, activitiesByEventIdError, activitiesByEventIdLoading } = useActivtiesByEventId(
    eventInfo.id
  );
  const [selected, setSelected] = useState();
  const [filteredActivities, setFilteredActivities] = useState([]);

  const datas = [];

  if (!activitiesByEventIdLoading) {
    activitiesByEventId.forEach((element) => {
      if (!datas.includes(dayjs(element.date).format('YYYY-MM-DD'))) {
        datas.push(dayjs(element.date).format('YYYY-MM-DD'));
      }
    });
  }

  useEffect(()=>{
    if(selected !== undefined){
      setFilteredActivities(activitiesByEventId.filter((element)=>{
        return dayjs(element.date).format('YYYY-MM-DD') === selected
      }))
    }
  }, [selected])

  return (
    <>
      <PageTitle>Escolha de atividades</PageTitle>
      {!userTicket || userTicket.status === 'RESERVED' ? (
        <ErrorComponent
          errorMessage={'Você precisa ter confirmado pagamento antes de fazer a escolha de atividades'}
        ></ErrorComponent>
      ) : userTicket.TicketType.isRemote ? (
        <ErrorComponent
          errorMessage={
            'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.'
          }
        ></ErrorComponent>
      ) : (
        <>
          {selected === undefined && <SectionTitle>Primeiro, filtre pelo dia do evento:</SectionTitle>}
          <DaysContainer>
            {datas.map((element, index) => (
              <Day key={index} data={element} selected={selected} setSelected={setSelected}></Day>
            ))}
          </DaysContainer>
          {selected !== undefined && (
            <ActivitiesContainer>
              <ActivitiesColumn title={'Auditório Principal'} activities={
                filteredActivities.filter((element)=>{
                return element.auditorium === "PRINCIPAL"
                })
              }></ActivitiesColumn>
              <ActivitiesColumn title={'Auditório Lateral'} activities={
                filteredActivities.filter((element)=>{
                return element.auditorium === "LATERAL"
                })
              }></ActivitiesColumn>
              <ActivitiesColumn title={'Sala de Workshop'} activities={
                filteredActivities.filter((element)=>{
                return element.auditorium === "WORKSHOP"
                })
              }></ActivitiesColumn>
            </ActivitiesContainer>
          )}
        </>
      )}
    </>
  );
}

const DaysContainer = styled.div`
  display: flex;
  gap: 0 17px;

  height: 70px;
  padding: 5px;

  overflow-x: scroll;
`;

const ActivitiesContainer = styled.div`
  width: 95%;
  height: 70%;

  margin-top: 30px;

  display: flex;
`;
