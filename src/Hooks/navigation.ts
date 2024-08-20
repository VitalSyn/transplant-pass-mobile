import { useCallback } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export function useNavigationHandler() {
  const navigation: NavigationProp<any> = useNavigation();

  const navigate = useCallback((route: string, params?: object) => {
    navigation.navigate(route, params);
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return { navigate, goBack };
}