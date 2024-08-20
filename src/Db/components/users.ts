import { collection, firestore, getDocs } from '../firebase';

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    let arrayUsers: any = [];
    querySnapshot.forEach((doc) => {
      arrayUsers.push({ ...doc.data(), id: doc.id });
    });
    return arrayUsers;
  } catch (error) {
    console.log(error)
  }
};