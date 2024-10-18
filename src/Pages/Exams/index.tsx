import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, TextInput, FlatList, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "@/src/Constants/Colors";
import { useNavigationHandler } from "@/src/Hooks/navigation";
import styles from "./styles";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ScreenHeader from "@/src/Components/ScreenHeader";
import { getNotifications } from "@/src/Db/components/patient";
import { INotification } from "@/src/Interfaces";
import AuthContext from "@/src/Context/AuthContext";
import { formatFirebaseDate } from "@/src/Utils";

export default function Exams() {
  const navigate = useNavigationHandler();
  const { notifications } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const showDatepicker = () => {
    setShowCalendar(true);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowCalendar(Platform.OS === 'ios'); // No iOS, o calendário permanece aberto após selecionar
    setSelectedDate(currentDate);
  };

  const renderNotificationItem = ({ item }: { item: INotification }) => (
    <TouchableOpacity style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: item.isRead ? Colors.white : Colors.green_light, padding: 10, width: '100%',
      borderRadius: 10, marginBottom: 10
    }}>
      <View style={{
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: Colors.background_types, width: 50, height: 50, borderRadius: 10
      }}>
        <Icon name="calendar-outline" size={20} color={Colors.white} />
      </View>

      <View style={styles.notificationItem}>
        <Text style={styles.notificationMessage} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
        <Text style={styles.notificationDate}>A validade expira em {formatFirebaseDate(item.date)}</Text>
      </View>

      <View style={{ width: 30 }}>
        <Text>02h</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Exames" />

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <View>
          <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {selectedDate ? selectedDate.toLocaleDateString() : "Escolher data"}
            </Text>
            <Icon name="calendar-outline" size={20} color={Colors.default} />
          </TouchableOpacity>

          {showCalendar && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor={Colors.gray}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search-outline" size={20} color={Colors.default} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ justifyContent: 'center' }}>
          <Text>Mostrar tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotificationItem}
        style={styles.notificationList}
      />
    </SafeAreaView>
  );
}
