import { Validation } from './Validation';
import { v4 as uuidv4 } from 'uuid';

export interface IContact {
  id: string;
  name: string;
  surname: string;
  email: string;
  createDate: Date;
  modificationDate: Date;
  _updateModificationDate(): void;
  containPhrase(phrase: string): boolean;
  modifyName(name: string): void;
  modifySurname(surname: string): void;
  modifyEmail(email: string): void;
  show(): void;
}

export class Contact implements IContact {
  
    id: string;
    name: string;
    surname: string;
    email: string;
    createDate: Date;
    modificationDate: Date;
  
    constructor(name: string, surname: string, email: string) {
      Validation.isStringEmpty(name);
      Validation.isStringEmpty(surname);
      Validation.isEmailValid(email);
      
      this.id = uuidv4();
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.createDate = new Date();
      this.modificationDate = new Date();
      
    }

    _updateModificationDate(): void{
      this.modificationDate = new Date();
    }
    
    containPhrase(phrase: string): boolean {
      Validation.isStringEmpty(phrase);

      if(Validation.isArgumentIncludesPhrase(this.name , phrase) || 
      Validation.isArgumentIncludesPhrase(this.surname , phrase) || 
      Validation.isArgumentIncludesPhrase(this.email , phrase)) {
        return true;
      }
      return false;
    }

    modifyName(name: string): void {
      Validation.isStringEmpty(name);
      this.name = name;
      this._updateModificationDate();
    }
    modifySurname(surname: string): void {
      Validation.isStringEmpty(surname);
      this.surname = surname;
      this._updateModificationDate();
    }
    modifyEmail(email: string): void {
      Validation.isEmailValid(email);
      this.email = email;
      this._updateModificationDate();
    }

    show(): void {
      console.log(`
      Contact: 
          id: ${this.id}
          name: ${this.name}
          surname: ${this.surname}
          createDate: ${this.createDate}
          modificationDate: ${this.modificationDate}
---------------------------------------------------------
      `);
    }
  }