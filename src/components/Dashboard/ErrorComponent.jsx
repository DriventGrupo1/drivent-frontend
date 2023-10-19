import styled from 'styled-components';

export default function ErrorComponent({ errorMessage }) {
  return (
    <MessageContainer>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </MessageContainer>
  );
}

const ErrorMessage = styled.div`
  width: 450px;
  height: 46px;
  text-align: center;
  color: #8e8e8e;
  font-size: 20px;
  font-weight: 400;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 246px;
`;
