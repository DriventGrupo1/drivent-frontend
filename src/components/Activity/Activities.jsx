import styled from 'styled-components';

export default function ActivitiesColumn({ title }) {
  return (
    <ActivitiesContainer>
      <AduditoriumTitle>{title}</AduditoriumTitle>
      <AduditoriumContainer></AduditoriumContainer>
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

  color: #7b7b7b;

  margin-bottom: 15px;
`;

const AduditoriumContainer = styled.div`
  height: 100%;

  border: 1px solid #d7d7d7;
`;
