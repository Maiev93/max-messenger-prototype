import type { AuthData, GreenApiResponseNotification } from '../types';
import { getApiUrl } from '../utils/helpers';

export async function sendMessage(
  auth: AuthData,
  chatId: string,
  message: string
): Promise<boolean> {
  const apiUrl = getApiUrl(auth.idInstance);
  const url = `${apiUrl}/waInstance${auth.idInstance}/sendMessage/${auth.apiTokenInstance}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${chatId}@c.us`,
        message: message,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function receiveNotification(auth: AuthData): Promise<GreenApiResponseNotification> {
  const apiUrl = getApiUrl(auth.idInstance);
  const url = `${apiUrl}/waInstance${auth.idInstance}/receiveNotification/${auth.apiTokenInstance}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteNotification(auth: AuthData, receiptId: number): Promise<boolean> {
  const apiUrl = getApiUrl(auth.idInstance);
  const url = `${apiUrl}/waInstance${auth.idInstance}/deleteNotification/${auth.apiTokenInstance}/${receiptId}`;

  try {
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}