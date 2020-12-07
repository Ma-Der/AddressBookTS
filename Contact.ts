import { Validation } from './Validation';
import { v4 as uuidv4 } from 'uuid';

export class Contact {
  
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

    private updateModificationDate(): void{
      this.modificationDate = Date.now();
    }
    
    containsPhrase(phrase: string): void {
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
      this.updateModificationDate();
    }
    modifySurname(surname: string): void {
      Validation.isStringEmpty(surname);
      this.surname = surname;
      this.updateModificationDate();
    }
    modifyEmail(email: string): void {
      Validation.isEmailValid(email);
      this.email = email;
      this.updateModificationDate();
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