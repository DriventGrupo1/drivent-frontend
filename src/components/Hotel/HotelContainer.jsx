import { useState } from 'react';
import styled from 'styled-components';
import HotelComponent from './HotelComponent';
import useHotels from '../../hooks/api/useHotels';
import { SectionTitle } from '../Dashboard/GlobalComponents';

export default function HotelContainer(props) {
  const { enableSelectRoom } = props;
  const { hotels, hotelError, hotelLoading } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <Caixa>
      {hotelLoading ? (
        <>Carregando...</>
      ) : hotelError ? (
        <SectionTitle $center={'error'}>Nenhum hotel encontrado!</SectionTitle>
      ) : (
        hotels.map((hotel) => (
          <HotelComponent
            key={hotel.id}
            hotelInfo={hotel}
            enableSelectRoom={enableSelectRoom}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
        ))
      )}
    </Caixa>
  );
}

const Caixa = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  scrollbar-color: #525252 #b3b3b390;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #b3b3b390;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #525252;
    border-radius: 15px;
  }
`;
