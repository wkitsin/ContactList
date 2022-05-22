import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ContactContext } from './App';
import { ASYNC_STORAGE_KEY, useGetContacts } from './helpers/asyncStorage';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';
import { ContactListType, RootStackParamList } from './typings';
import Icon from 'react-native-vector-icons/dist/Feather';
import CONTACT_LISTS from './data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemSeparatorComponent = () => (
  <View
    style={[
      styles.separator,
    ]}
  />
)

type ContactsNavProps = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Contacts = (props: ContactsNavProps) => {
  const { navigation } = props;
  const { setContacts, contacts } = useContext(ContactContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    useGetContacts().then(result => {
      setContacts(result)
    });

    // Navigation
    navigation.setOptions({
      headerTintColor: Color.BLACK,
      headerRight: () => (
        <Icon name='plus' size={20} color={Color.PRIMARY} />
      ),
      headerLeft: () => (
        <Icon name='search' size={20} color={Color.PRIMARY} />
      )
    });
  }, []);

  const renderItem = ({ item }: { item: ContactListType }) => (
    <TouchableOpacity
      style={styles.contactContainer}
      onPress={() => navigation.navigate('EditContact', {
        contact: item,
      })}
    >
      <View
        style={styles.avatar}
      />

      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>
    </TouchableOpacity>
  )

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setContacts(CONTACT_LISTS);
    const jsonValue = JSON.stringify(CONTACT_LISTS);
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    setIsRefreshing(false);
  }, []);

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />}
        contentContainerStyle={styles.flatList}
        data={contacts}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: Color.WHITE,
  },
  contactContainer: {
    padding: SPACING.S_2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Color.PRIMARY,
    borderRadius: 20,
    height: 40,
    width: 40,
    marginRight: SPACING.S_2,
  },
  name: {
    fontSize: 20,
  },
  separator: {
    borderBottomColor: Color.BORDER,
    borderBottomWidth: 1,
    marginLeft: SPACING.S_2,
  }
});

export default Contacts;