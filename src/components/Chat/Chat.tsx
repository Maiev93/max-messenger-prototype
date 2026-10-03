import { useState } from 'react';
import styles from './Chat.module.css';
import { sendMessage } from '../../api/messages';
import { useMessagePolling } from './useMessagePolling';
import type { AuthData, MessageItem } from '../../types';

type ChatProps = {
  auth: AuthData;
  onLogout: () => void;
};

const UserAvatar = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

function Chat({ auth, onLogout }: ChatProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeChatId, setActiveChatId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState(false);

  useMessagePolling({ auth, activeChatId, setMessages });

  const handleCreateChat = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (cleanPhone.length === 11 && cleanPhone.startsWith('7')) {
      setActiveChatId(cleanPhone);
      setMessages([]);
      setPhoneNumber('');
      setPhoneError(false);
      setChatError(null);
    } else {
      setPhoneError(true);
    }
  };

  const handleSendMessage = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChatId || isSending) return;

    const currentText = messageText.trim();
    setMessageText('');
    setIsSending(true);
    setChatError(null);

    const success = await sendMessage(auth, activeChatId, currentText);

    if (success) {
      const newMessage: MessageItem = {
        id: Date.now().toString(),
        text: currentText,
        type: 'outgoing',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
    } else {
      setMessageText(currentText);
      setChatError('Не удалось отправить сообщение. Пожалуйста, проверьте подключение к сети или настройки инстанса.');

      setTimeout(() => {
        setChatError(null);
      }, 10000);
    }

    setIsSending(false);
  };

  return (
    <div className={styles.chatPage}>

      <aside className={styles.chatSidebar}>
        <div className={styles.chatSidebarHeader}>
          <h2 className={styles.chatSidebarTitle}>Чаты</h2>
          <button className={styles.chatSidebarBtnLogout} onClick={onLogout} title="Выйти">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

        <form className={styles.chatSidebarForm} onSubmit={handleCreateChat}>
          <input
            type="text"
            placeholder="Номер телефона (например, 79991234567)"
            className={`${styles.chatSidebarInputPhone} ${phoneError ? styles.chatSidebarInputPhoneInvalid : ''}`}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (phoneError) setPhoneError(false);
            }}
          />
          <button type="submit" className={styles.chatSidebarBtnCreate}>
            Создать чат
          </button>
        </form>

        <div className={styles.chatSidebarList}>
          {activeChatId && (
            <div className={`${styles.chatSidebarItem} ${styles.chatSidebarItemActive}`}>
              <div className={styles.chatSidebarAvatar}>
                <UserAvatar />
              </div>
              <div className={styles.chatSidebarInfo}>
                <div className={styles.chatSidebarName}>+{activeChatId}</div>
                <div className={styles.chatSidebarMessageLast}>Чат открыт</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <main className={styles.chatWindow}>
        {activeChatId ? (
          <>
            <header className={styles.chatWindowHeader}>
              <div className={styles.chatWindowAvatar}>
                <UserAvatar />
              </div>
              <div className={styles.chatWindowNameCurrent}>+{activeChatId}</div>
            </header>

            <div className={styles.chatWindowMessageArea}>
              {messages.length === 0 ? (
                <div className={styles.chatWindowPlaceholder}>
                  <h3 className={styles.chatWindowPlaceholderTitle}>Сообщений нет</h3>
                  <p className={styles.chatWindowPlaceholderText}>Напишите первое текстовое сообщение, чтобы начать диалог.</p>
                </div>
              ) : (
                <div className={styles.chatWindowMessagesList}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.chatWindowMessageBubble} ${msg.type === 'outgoing' ? styles.chatWindowMessageOutgoing : styles.chatWindowMessageIncoming
                        }`}
                    >
                      <div className={styles.chatWindowMessageText}>{msg.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {chatError && <div className={styles.chatWindowInputError}>{chatError}</div>}
            </div>

            <div className={styles.chatWindowFooter}>
              <form className={styles.chatWindowInputBar} onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Введите сообщение..."
                  className={styles.chatWindowInputMessage}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onFocus={() => setChatError(null)}
                  disabled={isSending}
                />
                <button
                  type="submit"
                  className={`${styles.chatWindowBtnSend} ${isSending ? styles.chatWindowBtnSendLoading : ''}`}
                  disabled={isSending}
                  title="Отправить"
                >
                  {isSending ? (
                    <span className={styles.chatWindowTextSpinner}>...</span>
                  ) : (
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
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className={styles.chatWindowMessageArea}>
            <div className={styles.chatWindowPlaceholder}>
              <h3 className={styles.chatWindowPlaceholderTitle}>Мессенджер</h3>
              <p className={styles.chatWindowPlaceholderText}>Выберите чат или введите номер телефона слева, чтобы начать общение.</p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

export default Chat;
