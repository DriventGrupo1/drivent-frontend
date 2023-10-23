import { createContext, useEffect, useState } from 'react';
import useUserTicket from '../hooks/api/useUserTicket';

const UserTicketContext = createContext();
export default UserTicketContext;

export function UserTicketProvider({ children }) {
  const [newLogin, setNewLogin] = useState(false);
  const { getTicket } = useUserTicket();
  const [userTicket, setUserTicket] = useState(undefined);
  const [userTicketLoading, setUserTicketLoading] = useState(false);
  const [userTicketError, setUserTicketError] = useState(undefined);

  useEffect(() => {
    setUserTicketLoading(true);
    getTicket()
      .then((res) => {
        setUserTicket(res);
        setUserTicketLoading(false);
        setNewLogin(false);
      })
      .catch((err) => {
        console.log(err);
        setUserTicket(null);
        setUserTicketError(err);
        setUserTicketLoading(false);
        setNewLogin(false);
      });
  }, [newLogin]);

  return (
    <UserTicketContext.Provider value={{ userTicket, setUserTicket, setNewLogin, userTicketLoading, userTicketError }}>
      {children}
    </UserTicketContext.Provider>
  );
}

// userTicketLoading: ticketLoading, userTicketError: ticketError
