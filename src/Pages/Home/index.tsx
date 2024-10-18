import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '@/src/Context/AuthContext';
import { useNavigationHandler } from '@/src/Hooks/navigation';
import styles from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import images from '@/src/Constants/images';
import Colors from '@/src/Constants/Colors';
import { Divider } from 'react-native-paper';
import { INotification } from '@/src/Interfaces';

export default function Home() {
  const { user, notifications, getAllNotifications, signOutApp } = useContext(AuthContext);
  const navigate = useNavigationHandler();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getAllNotifications();
    setIsRefreshing(false);
  }, []);

  const countUnreadNotifications = async () => {
    const result = await getAllNotifications()
    console.log('home: ', result)
    setNotificationCount(result?.filter(notification => !notification.isRead).length || 0)
  };

  useEffect(() => {
    countUnreadNotifications()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigate.navigate("Notifications")} style={styles.notificationButtonContainer}>
            <View
              style={styles.backgroundButtonInformation}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.backgroundButtonInformation}>
            <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.backgroundButtonInformation}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.initialText}>Bem vindo,</Text>
            <Text style={styles.initialText}>{user?.name}</Text>
          </View>

          <TouchableOpacity onPress={signOutApp}>
            <Image source={images.Profile} style={{ width: 50, height: 50, marginLeft: 10, borderRadius: 50 }} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigate.navigate("Chat")} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', zIndex: 1, height: 60, backgroundColor: Colors.default }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image source={images.LuaraIa} style={{ width: 150, height: 150 }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: Colors.white, fontWeight: 'bold' }}>
              Fale com nosso suporte
            </Text>

            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20 }}>
              LAURA-IA
            </Text>
          </View>
        </View>

        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Agende seus exames</Text>
            <Text>Ver tudo</Text>
          </View>
          <Divider style={{ margin: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center', width: '18%' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ color: Colors.default, textAlign: 'center' }}>Clínico</Text>
            </View>

            <View style={{ alignItems: 'center', width: '18%' }}>
              <FontAwesome name="stethoscope" size={24} color="black" />
              <Text style={{ color: Colors.default, textAlign: 'center' }}>Hepato-</Text>
              <Text style={{ color: Colors.default, textAlign: 'center' }}>logista</Text>
            </View>

            <View style={{ alignItems: 'center', width: '18%' }}>
              <MaterialIcons name="bloodtype" size={24} color="black" />
              <Text style={{ color: Colors.default, textAlign: 'center' }}>Exames de sangue</Text>
            </View>

            <View style={{ alignItems: 'center', width: '18%' }}>
              <FontAwesome5 name="file-medical-alt" size={24} color="black" />
              <Text style={{ color: Colors.default }}>Resultados</Text>
            </View>

            <View style={{ alignItems: 'center', width: '18%' }}>
              <Fontisto name="pills" size={24} color="black" />
              <Text style={{ color: Colors.default }}>Farmácia</Text>
            </View>
          </View>
        </View>

        <View style={{ padding: 20, backgroundColor: Colors.default, marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: Colors.white }}>Fila de transplante</Text>

          <Divider />

          <View style={{ alignItems: 'center', borderColor: Colors.white, borderWidth: 1, borderRadius: 10, marginTop: 20, padding: 10 }}>
            <Text style={{ color: Colors.white, }}>CLASSIFICAÇÃO</Text>
            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 18 }}>PRIORIDADE BAIXA</Text>
          </View>

          <Text style={{ fontSize: 16, color: Colors.white, textAlign: 'center', margin: 10 }}>Sua Pontuação MED é 6.</Text>

          <TouchableOpacity style={{ alignItems: 'center', backgroundColor: Colors.white, borderRadius: 30, padding: 10 }}>
            <Text style={{ color: Colors.red, fontWeight: 'bold' }}>ATUALIZA SEUS DADOS!</Text>
          </TouchableOpacity>
        </View>

        <View style={{ margin: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Mantenha-se atualizado</Text>
            <Text>Saiba mais</Text>
          </View>

          <Divider />

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <FontAwesome name="heartbeat" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Check-Ups</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate.navigate("Exams")} style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <FontAwesome name="stethoscope" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Exames</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <FontAwesome5 name="file-medical-alt" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Documentos</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigate.navigate("Tragetory")} style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <MaterialCommunityIcons name="dna" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Tragetória de Processo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <Ionicons name="chatbubbles-outline" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Suporte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '30%', backgroundColor: Colors.background_types, borderRadius: 20, height: 100 }}>
              <SimpleLineIcons name="phone" size={35} color="white" />
              <Text style={{ color: Colors.white, textAlign: 'center', paddingTop: 10 }}>Contato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}