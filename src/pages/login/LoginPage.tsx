import React, { useState } from 'react';
import styles from './LoginPage.module.scss';
import User from '../../core/types/user';
import api from '../../core/api/api';
import { setCookie } from '../../core/services/cookie';
import Input from '../../components/ui/input/Input';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onSubmit = async () => {
    const user: User = {
      username,
      email,
      password,
    };
    const response = await api.signIn(user);
    setCookie('token', response.token);
  };

  return (
    <main className={`${styles.loginPage} container`}>
      <div className={styles.login}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.caption}>Please enter your e-mail and password:</p>
        <form className={styles.form} onSubmit={preventDefaultSubmit}>
          <Input
            onChange={setUsername}
            type="email"
            className={styles.input}
            placeholder={'Username'}
          />
          <Input
            onChange={setEmail}
            type="email"
            className={styles.input}
            placeholder={'Email'}
          />
          <Input
            onChange={setPassword}
            type="password"
            className={styles.input}
            placeholder={'Password'}
          />
          <button onClick={onSubmit}>Sign In</button>
        </form>
        <div className={styles.create}>
          <span>{"Don't have an account? "}</span>
          <NavLink to="/registration">Create one</NavLink>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
