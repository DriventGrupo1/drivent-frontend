import api from './api';

export async function getActivitiesById (token, eventId){
  const response = await api.get(`/activities/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return response.data
}

export async function subscribeToActivity(body, token){
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}