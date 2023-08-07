import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, ScrollView} from 'react-native';
import NewAgendaItem from './NewAgendaItem';
import {Agenda} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const AgendaScreen = () => {
  const [agendaData, setAgendaData] = useState({
    '2023-08-01': [
      {
        time: '10:00 AM',
        title: 'Meeting 1',
        description: 'Discuss project status',
      },
    ],
    // More initial data
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddAgendaItem = newItem => {
    const updatedData = {
      ...agendaData,
      [selectedDate.toISOString().slice(0, 10)]: [
        ...(agendaData[selectedDate.toISOString().slice(0, 10)] || []),
        newItem,
      ],
    };
    setAgendaData(updatedData);
    setModalVisible(false);
  };

  const renderAgendaItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Hii</Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <NewAgendaItem
          onSave={handleAddAgendaItem}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>

      <View style={styles.addButtonContainer}>
        <Button
          title="Create New Agenda"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <Agenda
          items={agendaData}
          selected={selectedDate.toISOString().slice(0, 10)}
          renderItem={renderAgendaItem}
          onDayPress={day => setSelectedDate(new Date(day.timestamp))}
          renderEmptyData={() => <Text>No agenda items for this date.</Text>}
          rowHasChanged={(r1, r2) => r1.title !== r2.title} // If you have a unique key for each item, use it here
          current={selectedDate.toISOString().slice(0, 10)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  time: {
    fontSize: 14,
    color: '#999',
  },
  title: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    color: '#666',
  },
  addButtonContainer: {
    margin: 20,
  },
});

export default AgendaScreen;
