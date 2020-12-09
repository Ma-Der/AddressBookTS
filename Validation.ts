import { IContact } from './Contact';
import { IGroup } from './Group';

export class Validation {
  constructor() {}
  
  static isEmailValid(email: string): void {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!reg.test(email)) throw new Error("Invalid email address.");
  }

  static isStringEmpty(str: string): void {
    if(str.length === 0) throw new Error("Argument is empty, please fill this field.");
  }

  static isInstanceExistsInList(instance: IContact | IGroup, list: IContact[] | IGroup[]): boolean {
    return list.some((item: IContact | IGroup) => instance.id === item.id);
  }

  static isArgumentIncludesPhrase(arg: string, phrase: string): boolean {
    return arg.toLowerCase().includes(phrase.toLowerCase());
    
  }

  static removeOneBySplice(list: IContact[] | IGroup[], id: string): IContact[] | IGroup[] {
    const index = list.findIndex((el: IContact | IGroup) => el.id === id);
    list.splice(index, 1);
    return list;
  }
}
