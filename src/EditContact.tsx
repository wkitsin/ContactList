import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';

const EditContact = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View
        style={styles.avatar}
      />

      <View>
        <Text>Main Information</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: SPACING.S_2,
    flex: 1,
  },
  avatar: {
    backgroundColor: Color.PRIMARY,
    borderRadius: 40,
    height: 80,
    width: 80,
    marginRight: SPACING.S_2,
  },
});

export default EditContact;