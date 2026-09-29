import styles from './Chat.module.css';
import type { AuthData } from '../../types';

type ChatProps = {
  auth: AuthData;
};

function Chat({ auth }: ChatProps) {
  return (
    <div className={styles.chatPage}>
      
      <aside className={styles.chatSidebar}>
        <div className={styles.chatSidebarHeader}>
          <h2 className={styles.chatSidebarTitle}>Чаты</h2>
        </div>
        
        <div className={styles.chatSidebarForm}>
          <input 
            type="text" 
            placeholder="Номер телефона (например, 79991234567)" 
            className={styles.chatSidebarInputPhone}
          />
          <button className={styles.chatSidebarBtnCreate}>Создать чат</button>
        </div>

        <div className={styles.chatSidebarList}>
          <div className={`${styles.chatSidebarItem} ${styles.chatSidebarItemActive}`}>
            <div className={styles.chatSidebarAvatar}>МА</div>
            <div className={styles.chatSidebarInfo}>
              <div className={styles.chatSidebarName}>{auth.idInstance}</div>
              <div className={styles.chatSidebarMessageLast}>Нажмите, чтобы открыть переписку</div>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.chatWindow}>
        <header className={styles.chatWindowHeader}>
          <div className={styles.chatWindowAvatar}>МА</div>
          <div className={styles.chatWindowNameCurrent}>{auth.idInstance}</div>
        </header>

        <div className={styles.chatWindowMessageArea}>
          <div className={styles.chatWindowPlaceholder}>
            <h3 className={styles.chatWindowPlaceholderTitle}>Сообщений нет</h3>
            <p className={styles.chatWindowPlaceholderText}>Напишите первое текстовое сообщение, чтобы начать диалог.</p>
          </div>
        </div>

        <div className={styles.chatWindowFooter}>
          <form className={styles.chatWindowInputBar} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Введите сообщение..." 
              className={styles.chatWindowInputMessage}
            />
            <button type="submit" className={styles.chatWindowBtnSend} title="Отправить">
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}

export default Chat;
