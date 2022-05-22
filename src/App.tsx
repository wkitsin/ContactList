/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Contacts from './Contacts';
import EditContact from './EditContact';
import { Color } from './helpers/color';
import { ContactListType, RootStackParamList } from './typings';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ContactContext = createContext({
  contacts: [],
  setContacts: (contacts: ContactListType[]) => { },
});

const App = () => {
  const [contacts, setContacts] = React.useState<ContactListType[]>([]);
  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Color.HEADER },
          headerTintColor: Color.PRIMARY,
        }}>
          <Stack.Screen
            name='Contacts'
            component={Contacts}
          />
          <Stack.Screen name='EditContact' component={EditContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
