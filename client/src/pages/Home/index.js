import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import {
  Container,
  ContainerRight,
  ContainerLeft,
  ContentRight,
  ContentHeaderRight,
} from './styles';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Logo from '../../components/Logo';
import { home } from '../../services/ApiService';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  const handleCloseButton = () => {
    window.localStorage.removeItem('li_token');
    history.push('/');
  };

  useEffect(() => {
    async function checkUserAuth() {
      const auth = await home(window.localStorage.getItem('li_token'));

      if (auth.status === 401) {
        history.push('/');
      }
    }
    checkUserAuth();
  }, []);

  return (
    <Container>
      <ContainerLeft>
        <Logo />
      </ContainerLeft>
      <ContainerRight>
        <ContentHeaderRight>
          <Logo />
        </ContentHeaderRight>
        <ContentRight>
          <Title text="Usuário logado!" />
          <form
            style={{
              display: 'grid',
              justifyItems: 'center',
            }}
            onSubmit={handleCloseButton}
          >
            <Button text="Sair" />
          </form>
        </ContentRight>
      </ContainerRight>

      <Snackbar
        open={showMessage}
      >
        <Alert
          onClose={() => { setShowMessage(false); }}
          severity="success"
          variant="filled"
        >
          Login realizado com sucesso!
        </Alert>
      </Snackbar>

    </Container>
  );
}
