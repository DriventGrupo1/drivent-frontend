import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelById(){
  const token = useToken()

  const {
    data: hotelById,
    loading: hotelByIdLoading,
    error: hotelByIdError,
    act: getHotelById
  } = useAsync((id)=> hotelApi.getHotelById(token, id), false)

  return{
    hotelById,
    hotelByIdLoading,
    hotelByIdError,
    getHotelById
  }
}