import { v4 as uuidv4 } from 'uuid';
import { Validation } from './Validation';
import { IContact } from './Contact';

export interface IGroup {
  id: string;
  groupName: string;
  contactList: IContact[];
  modifyGroupName(name: string): void;
  addContact(contact: IContact): void;
  deleteContact(contact: IContact): void;
}

export class Group implements IGroup {
  id: string;
  groupName: string;
  contactList: IContact[];

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
    addContact(contact: IContact): void {
      if(Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does exists in this group.");
      this.contactList.push(contact);
    }
    deleteContact(contact: IContact): void {
      if(!Validation.isInstanceExistsInList(contact, this.contactList)) throw new Error("This contact does not exists in this group.");
      Validation.removeOneBySplice(this.contactList, contact.id);
    }
}