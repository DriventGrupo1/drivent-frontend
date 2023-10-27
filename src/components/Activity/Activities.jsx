import styled from 'styled-components';
import Activity from './Activity';

export default function ActivitiesColumn({ title, activities }) {

  return (
    <ActivitiesContainer>
      <AduditoriumTitle>{title}</AduditoriumTitle>
      <AduditoriumContainer>
        {activities.map((element)=><Activity key={element} activityInfo={element}></Activity>)}
      </AduditoriumContainer>
    </ActivitiesContainer>
  );
}

const ActivitiesContainer = styled.div`
  height: 100%;
  width: 100%;

  text-align: center;

  //background-color: red;
`;

const AduditoriumTitle = styled.p`
  font-size: 17px;
  font-family: 'Roboto', sans-serif;

  color: #7b7b7b;

  margin-bottom: 15px;
`;

const AduditoriumContainer = styled.div`
  height: 100%;
  border: 1px solid #d7d7d7;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  gap: 10px 0;
`;
