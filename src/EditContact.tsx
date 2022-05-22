import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';
import { ContactListType, RootStackParamList } from './typings';
import { useForm, Controller } from "react-hook-form";
import { ASYNC_STORAGE_KEY } from './helpers/asyncStorage';
import { ContactContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EditContactNavProps = NativeStackScreenProps<RootStackParamList, 'EditContact'>;

const EditContact = (props: EditContactNavProps) => {
  const { navigation, route } = props;
  const { params: { contact } } = route;
  const { setContacts, contacts } = useContext(ContactContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    }
  });

  const onSubmit = (data) => {
    const newContacts = contacts.map(contact => {
      if (contact.id === data.id) {
        return data;
      }
      return contact;
    });

    setContacts(newContacts);
    const jsonValue = JSON.stringify(newContacts);

    try {
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    } finally {
      navigation.pop();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text>
            Save
          </Text>
        </TouchableOpacity>
      )
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.avatarContainer}>
        <View
          style={styles.avatar}
        />
      </View>

      <View>
        <Text style={styles.title}>Main Information</Text>

        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name='lastName'
          />
          {errors.lastName && <Text>This is required.</Text>}
        </View>
      </View>

      <View>
        <Text style={styles.title}>Sub Information</Text>

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name='email'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Phone</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name='phone'
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingVertical: SPACING.S_2,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.S_2,
  },
  avatar: {
    backgroundColor: Color.PRIMARY,
    borderRadius: 40,
    height: 80,
    width: 80,
    marginRight: SPACING.S_2,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: Color.HEADER,
    paddingVertical: SPACING.S_1,
    paddingHorizontal: SPACING.S_2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.S_2,
    paddingVertical: SPACING.S_1,
  },
  textInput: {
    width: '75%',
    padding: SPACING.S_1,
    borderRadius: 8,
    borderColor: Color.INPUT,
    borderWidth: 1,
    color: 'black',
  }
});

export default EditContact;