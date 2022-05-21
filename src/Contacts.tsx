import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CONTACT_LISTS from './data.json';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';

interface ContactListType {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string
}

const ItemSeparatorComponent = () => (
  <View
    style={[
      styles.separator,
    ]}
  />
)

const Contacts = () => {
  const renderItem = ({ item }: { item: ContactListType }) => (
    <View style={styles.contactContainer}>
      <View
        style={styles.avatar}
      />
      <Text style={styles.name}>
        {item.firstName} {item.lastName}
      </Text>
    </View>
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
    paddingHorizontal: SPACING.S_2,
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