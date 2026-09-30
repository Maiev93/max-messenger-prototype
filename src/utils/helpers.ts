import type { GreenApiResponseNotification, MessageItem } from '../types';

export function getApiUrl(idInstance: string | number): string {
  const instanceStr = String(idInstance).trim();
  const hostNumber = instanceStr.substring(0, 4);
  const baseUrl = import.meta.env.VITE_GREEN_API_BASE_URL || '://green-api.com';
  return `https://${hostNumber}.${baseUrl}`;
}

export function parseIncomingMessage(
  notification: GreenApiResponseNotification,
  activeChatId: string
): MessageItem | null {
  if (!notification) return null;

  const { body } = notification;

  if (
    body.typeWebhook === 'incomingMessageReceived' &&
    body.messageData?.typeMessage === 'textMessage'
  ) {
    const text = body.messageData.textMessageData?.textMessage;
    const rawSenderPhone = body.senderData.senderPhoneNumber;

    if (!rawSenderPhone || !text) return null;

    const senderPhone = String(rawSenderPhone).replace(/\D/g, '');
    const currentActiveId = String(activeChatId).replace(/\D/g, '');

    if (senderPhone === currentActiveId) {
      return {
        id: body.idMessage,
        text: text,
        type: 'incoming',
        timestamp: body.timestamp * 1000,
      };
    }
  }

  return null;
}
