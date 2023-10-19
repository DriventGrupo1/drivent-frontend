import api from './api';

export async function getTicketTypes( token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
}

export async function getUserTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

  export async function saveUserTicket(body,token) {
    const response = await api.post('/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;
}