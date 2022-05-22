export interface ContactListType {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string
}

export type RootStackParamList = {
  Contacts: undefined;
  EditContact: { contact: ContactListType }
};