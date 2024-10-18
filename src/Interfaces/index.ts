import { Timestamp } from "firebase/firestore";

export interface INotification {
  id: string;
  title: string;
  date: Timestamp;
  message: string;
  isRead: boolean;
}