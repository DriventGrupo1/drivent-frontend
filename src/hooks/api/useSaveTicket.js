import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketsApi';

export default function useSaveTicket() {
  const token = useToken();

  const {
    loading: savedTicketLoading,
    error: savedTicketError,
    act: saveUserTicket,
  } = useAsync((data) => ticketApi.saveUserTicket(data, token), false);

  return {
    savedTicketLoading,
    savedTicketError,
    saveUserTicket,
  };
}
