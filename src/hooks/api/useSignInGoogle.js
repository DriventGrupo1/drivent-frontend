import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInGoogle() {
  const {
    loading: signInLoadingGoogle,
    error: signInErrorGoogle,
    act: signInGoogle,
  } = useAsync(authApi.signInGoogle, false);

  return {
    signInLoadingGoogle,
    signInErrorGoogle,
    signInGoogle,
  };
}
