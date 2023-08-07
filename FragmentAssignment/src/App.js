import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AgendaScreen from './components/AgendaScreen';
import {Text, StyleSheet} from 'react-native';
// import CreateNewAgendaModal from './screens/CreateNewAgendaModal';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Text style={styles.container}> t</Text>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Agenda" component={AgendaScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    fontFamily: 'SpaceGrotesk',
    fontSize: 50,
  },
});

export default App;
