import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

import gitLogo from '../../assets/images/icons/github-logo.png';
import googleLogo from '../../assets/images/icons/google.1024x1024.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

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

  const GIT_URL = 'https://github.com/login/oauth/authorize';
  const GIT_CLIENT_ID = '2b488ba0f3a97b382052';
  const params = new URLSearchParams({
    responseType: 'code',
    scope: 'user',
    client_id: GIT_CLIENT_ID,
    redirect_uri: 'http://localhost:5173/',
  });

  const authGithubURL = `${GIT_URL}?${params.toString()}`;

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
      <OutsideLogin type="button" outsideUrl={authGithubURL}>
        <img src={gitLogo} alt="gitLogo" />
        Continuar com o Github
      </OutsideLogin>
      <OutsideLogin type="button" outsideUrl={'teste'}>
        <img src={googleLogo} alt="googleLogo" />
        Continuar com o Google
      </OutsideLogin>
    </AuthLayout>
  );
}
