import useToken from '../useToken';
import useAsync from '../useAsync';
import * as ticketApi from '../../services/ticketsApi';

export default function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketTypes,
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypes,
    ticketLoading,
    ticketError,
    getTicketTypes,
  };
}
