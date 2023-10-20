import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from 'styled-components';

export default function CardForm({ cardInfo, handleInputChange, handleInputFocus }) {
  return (
    <Container>
      <Cards number={cardInfo.number} expiry={cardInfo.expiry} cvc={cardInfo.cvc} name={cardInfo.name} focused={cardInfo.focus} />
      <Form>
        <input
          type="text"
          name="number"
          maxLength="16"
          placeholder="Card Number"
          value={cardInfo.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <span>E.g.: 49..., 51..., 36..., 37... </span>
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Name"
          value={cardInfo.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div>
          <input
            type="tel"
            name="expiry"
            maxLength="5"
            placeholder="Valid Thru"
            value={cardInfo.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            maxLength="4"
            value={cardInfo.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  max-width: 700px;
  justify-content: start;
  gap: 30px;
  margin-bottom: 55px;

  div:first-child {
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    width: 350px;
    height: 45px;
    border-radius: 6px;
    border: 1px solid #c9c9c9;
    font-size: 20px;
    padding: 0 10px;
  }

  input::placeholder {
    color: #c9c9c9;
  }

  span {
    color: #c9c9c9;
    margin-top: -13px;
  }

  div {
    display: flex;
    gap: 20px;

    input:first-child {
      width: 210px;
    }

    input:last-child {
      width: 120px;
    }
  }
`;
