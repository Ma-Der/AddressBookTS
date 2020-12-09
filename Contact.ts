import { Validation } from './Validation';
import { v4 as uuidv4 } from 'uuid';

export interface IContact {
  id: string;
  name: string;
  surname: string;
  email: string;
  createDate: number;
  modificationDate: number;
  _updateModificationDate(): void;
  displayContactContainingPhrase(phrase: string): void;
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
  createDate: number;
  modificationDate: number;
  
    constructor(name: string, surname: string, email: string) {
      Validation.isStringEmpty(name);
      Validation.isStringEmpty(surname);
      Validation.isEmailValid(email);
      
      this.id = uuidv4();
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.createDate = Date.now();
      this.modificationDate = Date.now();
      
    }

    _updateModificationDate(): void{
      this.modificationDate = Date.now();
    }
    
    displayContactContainingPhrase(phrase: string): void {
      Validation.isStringEmpty(phrase);
      if(Validation.isArgumentIncludesPhrase(this.name , phrase) || 
      Validation.isArgumentIncludesPhrase(this.surname , phrase) || 
      Validation.isArgumentIncludesPhrase(this.email , phrase)) {
        return this.show();
      }
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