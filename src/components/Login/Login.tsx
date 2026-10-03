import { useState } from 'react';
import styles from './Login.module.css';
import type { AuthData } from '../../types';
import { checkInstanceStatus } from '../../api/auth';

type LoginProps = {
  onLogin: (data: AuthData) => void;
};

function Login({ onLogin }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const idInstance = formData.get('idInstance') as string;
    const apiTokenInstance = formData.get('apiTokenInstance') as string;

    if (idInstance && apiTokenInstance) {
      const credentials = { idInstance, apiTokenInstance };
      const isValid = await checkInstanceStatus(credentials);

      if (isValid) {
        onLogin(credentials);
      } else {
        setError('Неверный ID инстанса или API Token, либо инстанс не авторизован.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginCardTitle}>Вход в GREEN-API</h2>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && <div className={styles.loginFormError}>{error}</div>}

          <div className={styles.loginFormGroup}>
            <input
              type="text"
              name="idInstance"
              id="idInstance"
              placeholder="ID"
              className={styles.loginFormInput}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.loginFormGroup}>
            <input
              type="password"
              name="apiTokenInstance"
              id="apiTokenInstance"
              placeholder="API Token"
              className={styles.loginFormInput}
              autoComplete="off"
              disabled={isLoading}
              required
            />
          </div>

          <p className={styles.loginCardTextHint}>
            Для работы с чатом введите ID и токен вашего аккаунта.
          </p>

          <button
            type="submit"
            className={`${styles.loginFormBtnSubmit} ${isLoading ? styles.loginFormBtnSubmitLoading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Продолжить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;