import { v4 as uuidv4 } from 'uuid';
import { Validation } from './Validation';
import { Contact } from './Contact';

export class Group {
  id: string;
  groupName: string;
  contactList: Contact[];

    constructor(groupName: string) {
      Validation.isStringEmpty(groupName);
      this.id = uuidv4();
      this.groupName = groupName;
      this.contactList = [];
    }

    modifyGroupName(name: string): void {
      Validation.isStringEmpty(name);
      this.groupName = name;
    }
    addContact(contact: Contact): void {
      if(Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does exists in this group.");
      this.contactList.push(contact);
    }
    deleteContact(contact: Contact): void {
      if(!Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does not exists in this group.");
      Validation.removeOneBySplice(this.contactList, contact.id);
    }
}