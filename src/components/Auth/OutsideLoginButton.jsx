import styled from 'styled-components';
export default function OutsideLogin({ children, ...props }) {
  const { type, outsideUrl } = props;

  console.log(outsideUrl);
  return (
    <Button
      type={type}
      onClick={() => {
        window.location.replace(`${outsideUrl}`);
      }}
    >
      {children}
    </Button>
  );
}

export const Button = styled.button`
  min-width: 64px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;

  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  /* line-height: 1.75; */
  color: #3c4043;
  text-align: center;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
