import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ContactContext } from './App';
import { useGetContacts } from './helpers/asyncStorage';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';
import { ContactListType, RootStackParamList } from './typings';
import Icon from 'react-native-vector-icons/dist/Feather';

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

  return (
    <View>
      <FlatList
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