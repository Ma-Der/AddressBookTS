import { Validation } from './Validation';
import { Contact } from './Contact';
import { Group } from './Group';

export class AddressBook {
  
  private contactList: Contact[];
  private groupList: Group[];

  constructor() {
    this.contactList = [];
    this.groupList = [];
  }

  searchContact(filter: string): void {
    Validation.isStringEmpty(filter);
    this.contactList.filter(contact => contact.containsPhrase(filter));
  }

  addContact(contact: Contact): void {
    if(Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("Contact is already in this address book.");
    this.contactList.push(contact);      
  }

  editContact(contact: Contact, key: string, value: string): void {
    Validation.isStringEmpty(key);
    if(key !== 'name' && key !== 'surname' && key !== 'email') throw new Error("Wrong key.");
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

  deleteContact(contact: Contact): void {
    if(!Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does not exists in this group.");
    Validation.removeOneBySplice(this.contactList, contact.id);
  }

  addGroup(group: Group): void {
    if(Validation.isInstanceExistsInList(group, this.groupList)) throw new Error("Group is already in this address book.");
    this.groupList.push(group);
  }

  editGroup(group: Group, name: string): void {
    Validation.isStringEmpty(name);
    
    group.modifyGroupName(name);
  }
  deleteGroup(group: Group): void {
    if(!Validation.isInstanceExistsInList(group, this.groupList)) throw new Error("This contact does not exists in this group.");
    Validation.removeOneBySplice(this.groupList, group.id);
  }
}