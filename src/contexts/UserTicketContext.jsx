import { createContext } from 'react';

import Splash from '../components/Splash';

import useUserTicket from '../hooks/api/useUserTicket';

const UserTicketContext = createContext();
export default UserTicketContext;

export function UserTicketProvider({ children }) {
  const {ticket,ticketLoading,ticketError } = useUserTicket();
    console.log(ticketLoading, ticketError, ticket);
    
  if (ticketLoading) {
    return (
      <Splash loading />
    );
  }

  if (ticketError) {
    let message = eventError.response ? eventError.response.data.message : 'Could not connect to server. Please try again later.';
    return (
      <Splash message={message} />
    );
  }

  return (
    <UserTicketContext.Provider value={{ userTicket: ticket, userTicketError: ticketError }}>
      { children }
    </UserTicketContext.Provider>
  );
}
