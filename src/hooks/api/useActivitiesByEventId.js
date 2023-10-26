import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivtiesByEventId(eventId) {
  const token = useToken();

  const {
    data: activitiesByEventId,
    loading: activitiesByEventIdLoading,
    error: activitiesByEventIdError,
    act: getActivitiesByEventId,
  } = useAsync(() => activitiesApi.getActivitiesById(token, eventId));

  return {
    activitiesByEventId,
    activitiesByEventIdLoading,
    activitiesByEventIdError,
    getActivitiesByEventId,
  };
}
