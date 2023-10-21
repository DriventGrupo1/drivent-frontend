import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelById(id) {
  const token = useToken();

  const {
    data: hotelById,
    loading: hotelByIdLoading,
    error: hotelByIdError,
    act: getHotelById,
  } = useAsync(() => hotelApi.getHotelById(token, id));

  return {
    hotelById,
    hotelByIdLoading,
    hotelByIdError,
    getHotelById,
  };
}
