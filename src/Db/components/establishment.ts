
import { collection, deleteDoc, doc, firestore, getDocs, getDownloadURL, ref, setDoc, storage, updateDoc, uploadBytes } from "../firebase";


interface EstablishmentData {
  // Add the properties of your establishment data here
}

interface ProductData {
  // Add the properties of your product data here
}

interface CartData {
  userId: string;
  // Add the rest of the properties of your cart data here
}

export const getEstablishments = async (): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'establishments'));
    const arrayEstablishments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as any));
    return arrayEstablishments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const registerEstablishment = async (data: EstablishmentData, image: any, cnpj: string): Promise<boolean> => {
  try {
    const docRef = doc(firestore, 'establishments', cnpj);
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `/images/establishments/${cnpj}/logo`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(docRef, {
        image: downloadUrl,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getProductsForEstablishment = async (cnpj: string): Promise<any> => {
  try {
    const querySnapshot = await getDocs(collection(doc(firestore, 'establishments', cnpj), 'products'));
    let arrayProducts: ProductData[] = [];
    querySnapshot.forEach((doc) => {
      arrayProducts.push({ ...doc.data(), id: doc.id });
    });
    return arrayProducts;
  } catch (error) {
    console.log(error);
  }
};

export const registerProduct = async (data: ProductData, image: any, cnpj: string): Promise<boolean> => {
  try {
    const docRef = doc(collection(doc(firestore, 'establishments', cnpj), 'products'));
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `/images/establishments/${cnpj}/products/`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(docRef, {
        image: downloadUrl,
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCart = async (userId: string): Promise<any> => {
  try {
    const querySnapshot = await getDocs(collection(doc(firestore, 'checkout', userId), 'products'));
    let arrayCart: any = [];
    querySnapshot.forEach((doc) => {
      arrayCart.push({ ...doc.data(), idProduct: doc.id });
    });
    return arrayCart;
  } catch (error) {
    console.log(error);
  }
};

export const registerCart = async (data: any): Promise<boolean> => {
  try {
    const docRef = doc(collection(doc(firestore, 'checkout', data.userId), 'products'));
    await setDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeItemCart = async (userId: string, itemId: string): Promise<boolean> => {
  try {
    const docRef = doc(firestore, 'checkout', userId, 'products', itemId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};