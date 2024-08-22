import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { authInstance, firestore } from '../Db/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const STORAGE_KEY = '@user_data';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user data from storage', error);
    }
  };

  const saveUserData = async (data: User | null) => {
    try {
      if (data) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save user data to storage', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const userData: User = { id: firebaseUser.uid, email: firebaseUser.email || '', name: firebaseUser.displayName || '' };
          await saveUserData(userData);
          setUser(userData);
        } else {
          setUser(null);
          await saveUserData(null);
        }
      } catch (error) {
        console.error('Error during authentication state change', error);
      } finally {
        setLoading(false);
      }
    });

    loadUserData();
    setLoading(false);

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
      await saveUserData(userData);
      return true;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const createUser = async (data: User) => {
    try {
      const create = await createUserWithEmailAndPassword(authInstance, data.email, data.password || '');
      const userDoc = doc(collection(firestore, 'users'), create.user.uid);

      const userData: User = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        id: create.user.uid,
        created_at: new Date(),
      };

      await setDoc(userDoc, userData);
      setUser(userData);
      await saveUserData(userData);
      return true;
    } catch (error) {
      console.error('Create user error', error);
      return false;
    }
  };

  const updateUser = async (data: User, id: string) => {
    try {
      const userDoc = doc(collection(firestore, 'users'), id);
      await updateDoc(userDoc, {
        ...data,
        updated_at: new Date(),
      });
      setUser(data);
      await saveUserData(data);
      return true;
    } catch (error) {
      console.error('Update user error', error);
      return false;
    }
  };

  const signOutApp = async () => {
    try {
      await signOut(authInstance);
      setUser(null);
      await saveUserData(null);
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.default }}>
        <LoadingIndicator isLoading={loading} />
      </View>
    );
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
