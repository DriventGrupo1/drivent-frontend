import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentsApi from '../../services/paymentsApi';

export default function usePaymentProcess() {
  const token = useToken();

  const {
    loading: paymentProcessLoading,
    error: paymentProcessError,
    act: paymentProcess,
  } = useAsync((data) => paymentsApi.paymentProcess(data, token), false);

  return {
    paymentProcessLoading,
    paymentProcessError,
    paymentProcess,
  };
}
