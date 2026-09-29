import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginCardTitle}>Вход в GREEN-API</h2>
        
        <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.loginFormGroup}>
            <input 
              type="text" 
              id="idInstance" 
              placeholder="ID" 
              className={styles.loginFormInput}
              required 
            />
          </div>

          <div className={styles.loginFormGroup}>
            <input 
              type="password" 
              id="apiTokenInstance" 
              placeholder="API Token" 
              className={styles.loginFormInput}
              required 
            />
          </div>

          <p className={styles.loginCardTextHint}>
            Для работы с чатом введите ID и токен вашего аккаунта.
          </p>

          <button type="submit" className={styles.loginFormBtnSubmit}>
            Продолжить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
