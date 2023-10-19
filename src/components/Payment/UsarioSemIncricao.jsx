import { Typography } from "@mui/material";
import styled from "styled-components";

export default function UsuarioSemInscricao(){
    return(
    <ErrorContainer>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <MessageContainer>
        <ErrorMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ErrorMessage>
      </MessageContainer>
    </ErrorContainer>
    )
}

const ErrorContainer = styled.div`
  min-height: 100%;
`

const ErrorMessage = styled.div`
  width: 450px;
  height: 46px;
  text-align: center;
  color: #8E8E8E;
  font-size: 20px;
  font-weight: 400;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 246px;
`

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;