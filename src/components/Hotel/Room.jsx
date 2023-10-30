import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Room(props) {
  const { roomInfo, selectedRoom, setSelectedRoom, userBooking } = props;
  const isFull = roomInfo.Booking.length === roomInfo.capacity;
  const roomSpaces = Array.from({ length: Number(roomInfo.capacity) });

  return (
    <RoomButton onClick={() => setSelectedRoom(roomInfo.id)} $selected={selectedRoom === roomInfo.id} disabled={isFull}>
      <p>{roomInfo.name}</p>
      <div>
        {roomSpaces.map((_s, index) => {
          if (roomInfo.Booking[index] !== undefined && roomInfo.Booking[index]?.userId !== userBooking?.userId) {
            console.log('1');
            return <ReservedSpace key={index} />;
          } else if (
            userBooking !== null &&
            roomInfo?.Booking[index]?.userId === userBooking?.userId &&
            selectedRoom === roomInfo.id
          ) {
            console.log('2');
            return <ReservedSpace key={index} $selected={true}></ReservedSpace>;
          } else if (index === roomInfo.Booking.length && selectedRoom === roomInfo.id) {
            console.log('3');
            return <ReservedSpace key={index} $selected={true}></ReservedSpace>;
          } else {
            console.log('4');
            return <BsPerson key={index} />;
          }
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
