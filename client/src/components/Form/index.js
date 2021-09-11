import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import schema from './validation';
import { loginUser, home } from '../../services/ApiService';

export default function LoginForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [apiResponse, setApiResponse] = useState();
  const [errorText, setErrorText] = useState();
  // const [alertLogin, setAlertLogin] = useState(false);
  const [email] = useState('');
  const [password] = useState('');

  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitLoginForm = async (user) => {
    const res = await loginUser(user);

    setApiResponse(res.status);

    if (res.status === 200) {
      window.localStorage.setItem('li_token', res.data.access_token);
      setErrorText('Login realizado com sucesso!');
      const auth = await home(res.data.access_token);

      if (auth.status === 200) {
        history.push('/home');
      }
    } else if (res.status === 401) {
      setErrorText('Acesso negado');
    }
  };
  const enabled = (email.length > 0 && password.length > 0);

  const handleCloseErros = () => setShowMessage(false);
  const handleCloseAlertLogin = () => setApiResponse(false);

  useEffect(() => {
    if (errors.email?.message) {
      setShowMessage(true);
    }
  }, [errors]);

  useEffect(() => {
    if (errors.password?.message) {
      setShowMessage(true);
    }
  }, [errors]);

  return (
    <>
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleCloseErros}
          severity="error"
          variant="filled"
        >
          {errors.email ? errors.email?.message : errors.password?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={apiResponse}
      >
        <Alert
          onClose={handleCloseAlertLogin}
          severity={(apiResponse === 401) ? 'error' : 'success'}
          variant="filled"
        >
          {errorText}
        </Alert>
      </Snackbar>
      <form
        style={{
          display: 'grid',
          justifyItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmitLoginForm)}
      >
        <Input
          name="email"
          value={email}
          register={register}
          placeholder="e-mail"
        />
        <Input
          name="password"
          value={password}
          register={register}
          type="password"
          placeholder="senha"
        />
        {
         enabled
           ? <Button text="Entrar" />
           : <Button text="Entrar" disabled />
       }
      </form>
    </>
  );
}
