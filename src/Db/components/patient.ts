import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { INotification } from "@/src/Interfaces";

export const getNotifications = async (id: string): Promise<INotification[]> => {
  try {
    console.log('entrou')
    const querySnapshot = await getDocs(collection(doc(firestore, 'users', id), 'notification'));
    let arrayNotifications: INotification[] = [];
    querySnapshot.forEach((doc) => {
      arrayNotifications.push({ ...doc.data(), id: doc.id } as INotification);
    });
    console.log('na primeira função: ', arrayNotifications)
    return arrayNotifications;
  } catch (error) {
    console.log(error);
    return []; // Retorna um array vazio em caso de erro
  }
};