import styled, { css } from 'styled-components';

export const PageTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  color: #000000;
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 20px;
  margin-top: 30px;
  ${({center})=>
  center==="error" && css`
  width: 45%;
  margin:0;
  position: fixed;
  top:calc(50% - 10px);
  right:20%;
  @media (max-width: 600px) {
    right:27%;
  }
  `
  }
`;

export const PageButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #000000;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  padding: 10.5px 13px;
  cursor: pointer;
`;
