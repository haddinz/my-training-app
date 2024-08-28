export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface AddContactType {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateContactType extends Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
