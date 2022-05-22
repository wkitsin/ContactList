import CONTACT_LISTS from '../data.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContactListType } from '../typings';

export const ASYNC_STORAGE_KEY = '@contact_list';

export const useGetContacts = async (): Promise<ContactListType[]> => {
  try {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

    if (value) {
      const parsedJSON = JSON.parse(value);
      return parsedJSON;
    }

    const jsonValue = JSON.stringify(CONTACT_LISTS);
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    return CONTACT_LISTS;
  } catch (e) {
    // error reading value
  }
}
