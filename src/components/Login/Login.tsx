import styles from './Login.module.css';
import type { AuthData } from '../../types';

type LoginProps = {
  onLogin: (data: AuthData) => void;
};

function Login({ onLogin }: LoginProps) {
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const idInstance = formData.get('idInstance') as string;
        const apiTokenInstance = formData.get('apiTokenInstance') as string;
        console.log(idInstance, apiTokenInstance);
        
        if (idInstance && apiTokenInstance) {
          onLogin({ idInstance, apiTokenInstance });
        }
    };    
  
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginCardTitle}>Вход в GREEN-API</h2>
          
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.loginFormGroup}>
              <input 
                type="text" 
                name="idInstance"
                id="idInstance" 
                placeholder="ID" 
                className={styles.loginFormInput}
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
