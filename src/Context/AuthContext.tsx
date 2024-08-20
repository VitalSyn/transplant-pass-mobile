import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { authInstance, firestore } from '../Db/firebase';
import { getStorageData, removeStorageData, setStorageData } from './localStorage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { View } from 'react-native';
import Colors from '../Constants/Colors';
import { LoadingIndicator } from '../Components/LoadingIndicator';

interface User {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  points?: number;
  id?: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  updateUser: (data: User, id: string) => Promise<boolean>;
  createUser: (data: User) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>({
  signed: false,
  user: null,
  signOut: async () => { },
  setUser: () => { },
  login: async () => false,
  updateUser: async () => false,
  createUser: async () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (user: any) => {
      try {
        // Carrega o usuário do AsyncStorage
        const storedUser = await getStorageData();
        if (storedUser) {
          setUser(storedUser);
        }

        if (user) {
          const userData: User = { id: user.uid || '', email: user.email || '', name: user.displayName || '', };
          // Se o usuário do Firebase é diferente do usuário armazenado, atualiza o usuário no estado e no AsyncStorage
          if (userData.id !== storedUser?.id) {
            setUser(userData);
            await setStorageData(userData);
          }
        } else {
          setUser(null);
          await removeStorageData();
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const userDoc = doc(collection(firestore, 'users'), userCredential.user.uid);
      const docSnapshot = await getDoc(userDoc);

      if (!docSnapshot.exists()) {
        console.log('No such user!');
        return false;
      }

      const userData: User = { ...docSnapshot.data(), id: userCredential.user.uid } as User;
      setUser(userData);
      setStorageData(userData)
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const createUser = async (data: User) => {
    const create = await createUserWithEmailAndPassword(authInstance, data.email, data?.password || '');
    if (create.user) {
      const userDoc = doc(collection(firestore, 'users'), create.user.uid);
      const userData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      }
      await setDoc(userDoc, {
        ...userData,
        created_at: new Date,
      });
      setUser(userData);
      setStorageData(userDoc)
      return true;
    } else {
      return false;
    }
  };

  const updateUser = async (data: User, id: string) => {
    try {
      const userDoc = doc(collection(firestore, 'users'), id);
      await updateDoc(userDoc, {
        ...data,
        updated_at: new Date,
      });
      setUser(data);
      setStorageData(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signOutApp = async () => {
    try {
      await signOut(authInstance);
      setUser(null);
      removeStorageData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.default }}>
        <LoadingIndicator isLoading={loading} />;
      </View>
    )

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signOut: signOutApp,
        setUser,
        login,
        updateUser,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;