import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CONTACT_LISTS from './data.json';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';
import { ContactListType, RootStackParamList } from './typings';

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
        data={CONTACT_LISTS}
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