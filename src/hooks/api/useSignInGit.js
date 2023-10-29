import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInGit() {
  const { loading: signInLoadingGit, error: signInErrorGit, act: signInGit } = useAsync(authApi.signInGit, false);

  return {
    signInLoadingGit,
    signInErrorGit,
    signInGit,
  };
}
