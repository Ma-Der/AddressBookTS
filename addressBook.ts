import { Validation } from './Validation';
import { IContact } from './Contact';
import { IGroup } from './Group';

interface IAddressBook {
  contactList: IContact[];
  groupList: IGroup[];
}

export class AddressBook implements IAddressBook {
  
  contactList: IContact[];
  groupList: IGroup[];

  constructor() {
    this.contactList = [];
    this.groupList = [];
  }

  searchContact(filter: string): IContact[] {
    Validation.isStringEmpty(filter);
    return this.contactList.filter(contact => contact.containPhrase(filter) ? contact : false);
  }

  addContact(contact: IContact): void {
    if(Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("Contact is already in this address book.");
    this.contactList.push(contact);      
  }

  editContact(contact: IContact, key: 'name' | 'surname' | 'email', value: string): void {
    Validation.isStringEmpty(value);
      
    switch(key) {
      case 'name':
        return contact.modifyName(value);
      case 'surname':
        return contact.modifySurname(value);
      case 'email':
        return contact.modifyEmail(value);
    }
  }

  deleteContact(contact: IContact): void {
    if(!Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does not exists in this address book.");
    Validation.removeOneBySplice(this.contactList, contact.id);
  }

  addGroup(group: IGroup): void {
    if(Validation.isInstanceExistsInList(group, this.groupList)) throw new Error("Group is already in this address book.");
    this.groupList.push(group);
  }

  editGroup(group: IGroup, name: string): void {
    Validation.isStringEmpty(name);
    if(!Validation.isInstanceExistsInList(group, this.groupList)) throw new Error("Group does not exist.");
    group.modifyGroupName(name);
  }
  deleteGroup(group: IGroup): void {
    if(!Validation.isInstanceExistsInList(group, this.groupList)) throw new Error("This group does not exists in this address book.");
    Validation.removeOneBySplice(this.groupList, group.id);
  }
}