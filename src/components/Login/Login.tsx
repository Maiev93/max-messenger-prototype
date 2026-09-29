import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2 className={styles.formTitle}>Вход в GREEN-API</h2>
        
        <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              id="idInstance" 
              placeholder="ID" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <input 
              type="password" 
              id="apiTokenInstance" 
              placeholder="API Token" 
              required 
            />
          </div>

          <p className={styles.hintText}>
            Для работы с чатом введите ID и токен вашего аккаунта.
          </p>

          <button type="submit" className={styles.continueButton}>
            Продолжить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
