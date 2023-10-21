import { createContext } from 'react';

import useUserTicket from '../hooks/api/useUserTicket';

const UserTicketContext = createContext();
export default UserTicketContext;

export function UserTicketProvider({ children }) {
  const {ticket,ticketLoading,ticketError } = useUserTicket();

  return (
    <UserTicketContext.Provider value={{ userTicket: ticket, userTicketError: ticketError }}>
      { children }
    </UserTicketContext.Provider>
  );
}
