import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NewAgendaItem = ({onSave, onCancel}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(new Date());

  const handleSave = () => {
    // Check if all fields are filled before saving
    if (title && description) {
      const newAgendaItem = {
        date: date.toISOString().slice(0, 10),
        time: time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        title,
        description,
      };
      onSave(newAgendaItem);
      // Clear the input fields after saving
      setTitle('');
      setDescription('');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = selectedDate => {
    hideDatePicker();
    setDate(selectedDate);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = selectedTime => {
    hideTimePicker();
    setTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date:</Text>
      <Button title="Select Date" onPress={showDatePicker} />
      <Text style={styles.selectedText}>{date.toDateString()}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Time:</Text>
      <Button title="Select Time" onPress={showTimePicker} />
      <Text style={styles.selectedText}>
        {time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      </Text>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default NewAgendaItem;
