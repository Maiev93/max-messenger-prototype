export type AuthData = {
  idInstance: string;
  apiTokenInstance: string;
};

export type MessageItem = {
  id: string;
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: number;
};

export type GreenApiResponseNotification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderPhoneNumber: number | string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
} | null;