import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Room(props) {
  const { roomInfo, selectedRoom, setSelectedRoom } = props;
  const isFull = roomInfo.Booking.length === roomInfo.capacity;
  const roomSpaces = [];

  function setRoomSpaces() {
    for (let i = 0; i < roomInfo.Booking.length; i++) {
      roomSpaces.push('reserved');
    }
    for (let i = 0; i < roomInfo.capacity - roomInfo.Booking.length; i++) {
      roomSpaces.push('free');
    }
  }
  setRoomSpaces();

  return (
    <RoomButton onClick={() => setSelectedRoom(roomInfo.id)} $selected={selectedRoom === roomInfo.id} disabled={isFull}>
      <p>{roomInfo.name}</p>
      <div>
        {roomSpaces.map((space, index) => {
          if (space === 'reserved') {
            return <ReservedSpace key={index} />;
          } else if (index === roomInfo.Booking.length && selectedRoom === roomInfo.id) {
            return <ReservedSpace key={index} $selected={true}></ReservedSpace>;
          }
          return <BsPerson key={index} />;
        })}
      </div>
    </RoomButton>
  );
}

const RoomButton = styled.button`
  border: 1px solid #cecece;
  height: 45px;
  width: 190px;
  border-radius: 10px;
  background-color: ${(props) => (props.$selected ? '#FFEED2' : '#ffffff')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-bottom: -10px;
  cursor: pointer;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #454545;
  }

  div {
    font-size: 25px;
    margin-top: 5px;
    margin-right: -5px;
    color: #454545;
    display: flex;
    flex-direction: row-reverse;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #cecece;
  }
`;

const ReservedSpace = styled(BsPersonFill)`
  color: ${(props) => (props.$selected ? '#ff4791' : '#454545')};
`;
