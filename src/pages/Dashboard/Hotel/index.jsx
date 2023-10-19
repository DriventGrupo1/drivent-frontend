import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import HotelContainer from '../../../components/Hotel/HotelContainer';


export default function Hotel() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Subtitulo>Primeiro, escolha seu hotel</Subtitulo>
      <HotelContainer></HotelContainer>
    </>
  )
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Subtitulo = styled.div`
  color: #8E8E8E;
  font-size: 20px;
  font-weight: 400;
  font-family: Roboto;
  margin-top: 36px;
  margin-bottom: 18px;
`
