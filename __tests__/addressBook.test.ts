import { AddressBook } from '../addressBook';
import { Contact } from '../Contact';
import { Group } from '../Group';

describe('Address Book tests: ', () => {
    const addressBook = new AddressBook();
    const contact1 = new Contact('Jan', 'Kowalski', 'kowaljan@op.pl');
    const contact2 = new Contact('Marek', 'Marecki', 'marmar@op.pl');
    const contact3 = new Contact('Karolina', 'Polak', 'karpol@op.pl');
    const group1 = new Group('Bestofthebest');
    const group2 = new Group('Worst');
    const group3 = new Group('Middleones');
    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addGroup(group1);
    addressBook.addGroup(group2);
    

    it('adding Contact to Address Book contact list', () => {
        expect(addressBook.contactList).toHaveLength(2);
        expect(addressBook.contactList).toEqual([contact1, contact2]);
    });
    
    it('adding Group to Address Book group list', () => {
        expect(addressBook.groupList).toHaveLength(2);
        expect(addressBook.groupList).toEqual([group1, group2]);
    });
    
    it('should return error when adding to contact list and group list wrong arguments', () => {
        () => expect(addressBook.addContact('sdsa')).toThrowError();
        () => expect(addressBook.addGroup('sadasd')).toThrowError();
    });
    
    it('adding Contact that exists in contact list should throw error', () => {
        () => expect(addressBook.addContact(contact1)).toThrowError('Contact is already in this address book.');
    });
    
    it('adding Group that exists in group list should throw error', () => {
        () => expect(addressBook.addContact(contact1)).toThrowError('Group is already in this address book.');
    });

    it('searching Contact should return array with searched contact', () => {
        expect(addressBook.searchContact('kowal')).toEqual([contact1]);
    });
    
    it('search Contact with wrong argument should throw error', () => {
        () => expect(addressBook.searchContact(23)).toThrowError();
    });

    it('editing Contact name', () => {
        addressBook.editContact(contact1, 'name', 'John');
        expect(addressBook.contactList[0]).toHaveProperty('name', 'John');
    });

    it('editing Contact name with wrong argument should throw an error', () => {
        () => expect(addressBook.editContact(contact2, 'name', 123)).toThrowError();
    });

    it('editing Group name', () => {
        addressBook.editGroup(group2, 'Not worst');
        expect(addressBook.groupList[1]).toHaveProperty('groupName', 'Not worst');
    });

    it('deleting Contact', () => {
        addressBook.deleteContact(contact1);
        expect(addressBook.contactList).toHaveLength(1);
        expect(addressBook.contactList).toEqual([contact2]);
    });

    it('trying to delete contact that does not exists in address book should throw error', () => {
        () => expect(addressBook.deleteContact(contact3)).toThrowError();
    });

    it('deleting Group', () => {
        addressBook.deleteGroup(group2);
        expect(addressBook.groupList).toHaveLength(1);
        expect(addressBook.groupList).toEqual([group1]);
    });

    it('trying to delete group that does not exists in address book should throw error', () => {
        () => expect(addressBook.deleteGroup(group3)).toThrowError();
    });

});