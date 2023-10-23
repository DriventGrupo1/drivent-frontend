import { createContext, useEffect, useState } from 'react';

import useUserTicket from '../hooks/api/useUserTicket';

const UserTicketContext = createContext();
export default UserTicketContext;

export function UserTicketProvider({ children }) {
  const { ticket, ticketLoading, ticketError } = useUserTicket();

  const [userTicket, setUserTicket] = useState(undefined);
  useEffect(() => {
    setUserTicket(ticket);
  }, [ticketLoading]);

  return (
    <UserTicketContext.Provider
      value={{ userTicket, setUserTicket, userTicketLoading: ticketLoading, userTicketError: ticketError }}
    >
      {children}
    </UserTicketContext.Provider>
  );
}
