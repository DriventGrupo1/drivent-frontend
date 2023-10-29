import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}
//

export async function signInGoogle(codeResponse) {
  const tokens = await api.post('/auth/google', {
    code: codeResponse.code,
  });
  return tokens;
}

export async function signInGit(code) {
  const tokens = await api.post('/auth/git', {
    code,
  });
  return tokens;
}
