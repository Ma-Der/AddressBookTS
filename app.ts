import { Contact } from './Contact';
import { Group } from './Group';
import { AddressBook } from './addressBook';

const man = new Contact(
    'Mike',
    'Nowak',
    'any@anu.pl'
  );
  
  const man1 = new Contact(
    'Guy',
    'Ford',
    'asdadasasd@asd.pl'
  );
  
  const man2 = new Contact(
    'Haron',
    'Call',
    'asdadasasd@asd.pl'
  );
  const man3 = 'kjasd';

  man.modifyName('Jared');
  
  const groupOne = new Group('Best');
  groupOne.addContact(man);
  
  groupOne.addContact(man1);
  
  //groupOne.deleteContact(man);
  
  const addressOne = new AddressBook();
  
  addressOne.addContact(man);
  addressOne.addContact(man1);
  addressOne.addContact(man2);
  //addressOne.editContact(man, 'surname', 'Trzeciak');
  addressOne.addGroup(groupOne);
  
  addressOne.deleteContact(man1);
  console.log(addressOne);
  