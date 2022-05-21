import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Color } from './helpers/color';
import { SPACING } from './helpers/spacing';

const EditContact = () => {
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
          <TextInput
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.textInput}
          />
        </View>
      </View>

      <View>
        <Text style={styles.title}>Sub Information</Text>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.textInput}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.S_2,
    paddingVertical: SPACING.S_1,
  },
  textInput: {
    marginLeft: SPACING.S_3,
    flex: 1,
    padding: SPACING.S_1,
    borderRadius: 8,
    borderColor: Color.INPUT,
    borderWidth: 1,
    color: 'black',
  }
});

export default EditContact;