import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';
import OutsideLogin from '../../components/Auth/OutsideLoginButton';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';
import UserTicketContext from '../../contexts/UserTicketContext';

import useSignIn from '../../hooks/api/useSignIn';
import useSignInGoogle from '../../hooks/api/useSignInGoogle';
import useSignInGit from '../../hooks/api/useSignInGit';

import gitLogo from '../../assets/images/icons/github-logo.png';
import googleLogo from '../../assets/images/icons/google.1024x1024.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();
  const { signInGoogle } = useSignInGoogle();
  const { signInGit } = useSignInGit();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const { setNewLogin } = useContext(UserTicketContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    setButtonState(true);
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      setNewLogin(true);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast('Não foi possível fazer o login!');
      setButtonState(false);
    }
  }

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      setButtonState(true);
      try {
        const { data } = await signInGoogle(codeResponse);
        setUserData(data);
        setNewLogin(true);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        toast('Não foi possível fazer o login!');
        setButtonState(false);
      }
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      toast('Não foi possível fazer o login!');
      setButtonState(false);
    },
  });

  function gitLogin() {
    const params = new URLSearchParams({
      responseType: 'code',
      scope: 'user',
      client_id: import.meta.env.VITE_GIT_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GIT_REDIRECT_URL,
    });
    window.location.replace(`${import.meta.env.VITE_GIT_URL}?${params.toString()}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setButtonState(true);

      signInGit(code)
        .then((res) => {
          setUserData(res.data);
          setNewLogin(true);
          toast('Login realizado com sucesso!');
          navigate('/dashboard');
          setButtonState(false);
        })
        .catch((err) => {
          console.log(err);
          toast('Não foi possível fazer o login!');
          setButtonState(false);
        });
    }
  }, []);

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input
            label="E-mail"
            type="text"
            fullWidth
            value={email}
            disabled={buttonState}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            disabled={buttonState}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={buttonState}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
      <OutsideLogin type="button" disabledStatus={buttonState} outsideLoginFunction={gitLogin}>
        <img src={gitLogo} alt="gitLogo" />
        Continuar com o Github
      </OutsideLogin>
      <OutsideLogin type="button" disabledStatus={buttonState} outsideLoginFunction={googleLogin}>
        <img src={googleLogo} alt="googleLogo" />
        Continuar com o Google
      </OutsideLogin>
    </AuthLayout>
  );
}
