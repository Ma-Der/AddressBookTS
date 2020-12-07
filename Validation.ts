import { Contact } from './Contact';
import { Group } from './Group';

export class Validation {
  constructor() {}
  
  static isEmailValid(email: string): void {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!reg.test(email)) throw new Error("Invalid email address.");
  }

  static isStringEmpty(str: string): void {
    if(str.length === 0) throw new Error("Argument is empty, please fill this field.");
  }

  static isInstanceExistsInList(instance: Contact | Group, list: Contact[] | Group[]): boolean {
    return list.some((item: Contact | Group) => instance.id === item.id);
  }

  static isArgumentIncludesPhrase(arg: string, phrase: string): boolean {
    return arg.toLowerCase().includes(phrase.toLowerCase());
    
  }

  static removeOneBySplice(list: Contact[] | Group[], id: string): Contact[] | Group[] {
    const index = list.findIndex((el: Contact | Group) => el.id === id);
    list.splice(index, 1);
    return list;
  }
}
