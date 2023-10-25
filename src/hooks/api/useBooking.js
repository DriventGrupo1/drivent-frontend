import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: booking,
  } = useAsync((type, data, roomId) => {
    switch (type) {
      case 'get':
        return bookingApi.getUserBooking(token);
      case 'create':
        return bookingApi.createUserBooking(data, token);
      case 'update':
        return bookingApi.updateUserBooking(data, token, roomId);
      default:
        return null;
    }
  });

  return {
    bookingLoading,
    bookingError,
    booking,
  };
}
