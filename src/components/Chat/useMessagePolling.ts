import { useEffect } from 'react';
import { receiveNotification, deleteNotification } from '../../api/messages';
import { parseIncomingMessage } from '../../utils/helpers';
import type { AuthData, MessageItem } from '../../types';

type UseMessagePollingProps = {
    auth: AuthData;
    activeChatId: string;
    setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
};

export function useMessagePolling({ auth, activeChatId, setMessages }: UseMessagePollingProps) {
    useEffect(() => {
        if (!activeChatId) return;

        let isMounted = true;

        const pollMessages = async () => {
            while (isMounted && activeChatId) {
                const notification = await receiveNotification(auth);

                if (!notification) {
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    continue;
                }

                const incomingMsg = parseIncomingMessage(notification, activeChatId);

                if (incomingMsg) {
                    setMessages((prev) => [...prev, incomingMsg]);
                }

                await deleteNotification(auth, notification.receiptId);
            }
        };

        pollMessages();

        return () => {
            isMounted = false;
        };
    }, [activeChatId, auth, setMessages]);
}
