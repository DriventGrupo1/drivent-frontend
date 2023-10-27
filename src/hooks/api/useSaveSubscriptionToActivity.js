import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useSaveSubscriptionToActivity() {
  const token = useToken();

  const {
    loading: savedSubscriptionToActivityLoading,
    error: savedSubscriptionToActivityError,
    act: saveSubscriptionToActivity,
  } = useAsync((data) => activitiesApi.subscribeToActivity(data, token), false);

  return {
    savedSubscriptionToActivityLoading,
    savedSubscriptionToActivityError,
    saveSubscriptionToActivity,
  };
}
