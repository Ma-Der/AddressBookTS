import { AddressBook } from "../addressBook";
import { Contact } from "../Contact";
import { Group } from "../Group";

/* 15 kontaktów, 5 grup, 1 książka adresowa
 użytkownik tworzy 30 kontaktów, myli się przy 4 kontaktach i wprowadza:
- zły adres email przy jednym i chce go poprawić
- przy 2 myli się w imieniu i chce je poprawić
- przy jednym podaje złe nazwisko i chce je poprawić

dodaje je do książk adresowej i zauważa, że jeszcze 2 kontakty mają do poprawy: imię, drugi maila
najpierw je wyszukuje i potem poprawia, przy wyszukiwaniu jednego zapomnniał się i pozostawił puste pole i zaakceptował edycje, przez
co pojawił się błąd

użytkownik tworzy 5 grup i dodaje je do książki adresowej:
- przyjaciele
- rodzina
- znajomi - praca
- firmy
- użytkowe

myli się przy nadawaniu nazwy w jednej z nich i je poprawia
przy edycji podaje tylko nazwe kontaktu i zapomina sie i nie podaje nowej nazwy grupy - pojawia się błąd 

dodaje do grup odpowiednie kontakty, przez pomyłkę dodaje do jednej grupy ten sam kontakt, który już w niej istnieje
przez pomyłkę dodaje 2 kontakty, które nie powinny się znaleźć w danej grupie i usuwa je z grupy,

po jakimś czasie usuwa kontakty z ksiazki adresowej (3) z różnych powodów
przez przypadek doszlo do literówki i zaakceptowano usunięcie kontaktu, który nie istniał co spowodowało błąd
*/

const addressBook = new AddressBook();

const contact1 = new Contact("Piotr", "Nowak", "piotr.nowak@mail.com");
const contact2 = new Contact("Adam", "Kowal", "adam.kowal@mail.com");
const contact3 = new Contact("Agnieszka", "Mundra", "agnieszka.mundra@mail.com");
const contact4 = new Contact("Marcin", "Nowy", "marcin.nowy@mail.com");
const contact5 = new Contact("Adrian", "Kowalewski", "adrian.kowalewski@mail.com");
const contact6 = new Contact("Paulina", "Czarna", "paulina.czarna@mail.com");
const contact7 = new Contact("Kornelia", "Lipa", "kornelia.lipa@mail.com");
const contact8 = new Contact("Wiesław", "Piłka", "wieslaw.pilka@mail.com");
const contact9 = new Contact("Konstanty", "Karney", "konstanty.karny@mail.com");
const contact10 = new Contact("Marta", "Jarząbek", "marta.jarzzzzabek@mail.com");
const contact11 = new Contact("Jacek", "Bielawski", "jacek.bielawski@mail.com");
const contact12 = new Contact("Michał", "Świeży", "michal.swiezy@mail.com");
const contact13 = new Contact("Korol", "Lawina", "karol.lawina@mail.com");
const contact14 = new Contact("Ola", "Korba", "ola.korba@mail.com");
const contact15 = new Contact("Radosław", "Koniec", "radoslaw.koniec@mail.com");

const group1 = new Group("Rodzina");
const group2 = new Group("Przyjacciele");
const group3 = new Group("Znajomi - praca");
const group4 = new Group("Firmy");
const group5 = new Group("Użytkowe");

describe("User creates", () => {
    test("one addressBook", () => {
        expect(addressBook).toBeDefined();
    });

    test("fifteen contacts", () => {
        const contacts = [contact1, contact2, contact3, contact4, contact5, contact6, contact7, contact8, contact9, contact10, contact11, contact12, contact13, contact14, contact15];
        contacts.forEach((contact) => expect(contact).toBeDefined());
    });

    const groups = [group1, group2, group3, group4, group5];

    test("five groups", () => {
        groups.forEach((group) => expect(group).toBeDefined());
    });
});

describe("User adds groups", () => {
    const groups = [group1, group2, group3, group4, group5];
    groups.forEach((group) => addressBook.addGroup(group));

    test("to addressBook", () => {
        const properResult = groups;

        expect(addressBook.groupList).toHaveLength(5);
        expect(addressBook.groupList).toEqual(properResult);
    });

    describe("to addressBook with mistake", () => {
        const groupToFix = groups[1];
        test("and to correct it, edits one of them", () => {
            const properResult = "Przyjaciele";
            addressBook.editGroup(groupToFix, "Przyjaciele");

            expect(groupToFix.groupName).toEqual(properResult);
        });

        test("as he lefts empty string", () => {
            expect(() => addressBook.editGroup(groupToFix, "")).toThrowError("Argument is empty, please fill this field.");
        });
    });   

});

describe("User wants to correct contacts for", () => {

    test("two names", () => {
        const properName1 = "Michał";
        const properName2 = "Piotrek";
        contact1.modifyName(properName1);
        contact3.modifyName(properName2);

        expect(contact1.name).toEqual(properName1);
        expect(contact3.name).toEqual(properName2);
    });

    test("one surname", () => {
        const properResult = "Karny";
        contact9.modifySurname("Karny");

        expect(contact9.surname).toEqual(properResult);
    });

    test("one email", () => {
        const properResult = "marta.jarzabek@mail.com";
        contact10.modifyEmail("marta.jarzabek@mail.com");

        expect(contact10.email).toEqual(properResult);
    });
});

describe("User adds contacts", () => {
    const contacts = [contact1, contact2, contact3, contact4, contact5, contact6, contact7, contact8, contact9, contact10, contact11, contact12, contact13, contact14, contact15];
    contacts.forEach((contact) => addressBook.addContact(contact));

    test("to addressBook", () => {
        const properResult = contacts;

        expect(addressBook.contactList).toHaveLength(15);
        expect(addressBook.contactList).toEqual(properResult);
    });

    describe("and try to correct 2 more contacts by", () => {
        describe("searching them by", () => {
            const search1 = addressBook.searchContact("karol");
            const search2 = addressBook.searchContact("korba");

            test("empty string causes error", () => {
                expect(() => addressBook.searchContact("")).toThrowError("Argument is empty, please fill this field.");
            });

            test("string", () => {
                const properResultSearch1 = [contact13];
                const properResultSearch2 = [contact14];

                expect(search1).toEqual(properResultSearch1);
                expect(search2).toEqual(properResultSearch2);
            });

            describe("string and fixing", () => {
                test("one name", () => {
                    const properResult = "Karol";
                    const [contact] = search1;

                    addressBook.editContact(contact, "name", "Karol");

                    expect(contact.name).toEqual(properResult);
                });

                test("one email", () => {
                    const properResult = "aleksandra.korba@mail.com";
                    const [contact] = search2;
                    addressBook.editContact(contact, "email", "aleksandra.korba@mail.com" );

                    expect(contact.email).toEqual(properResult);
                });
            });
        });
    });

    [...contacts].slice(0, 6).forEach((contact) => group1.addContact(contact));
    [...contacts].slice(6, 9).forEach((contact) => group2.addContact(contact));
    [...contacts].slice(9, 11).forEach((contact) => group3.addContact(contact));
    [...contacts].slice(11).forEach((contact) => group4.addContact(contact));

        test("to groups", () => {
            const group1Content = [contact1, contact2, contact3, contact4, contact5, contact6];
            const group2Content = [contact7, contact8, contact9];
            const group3Content = [contact10, contact11];
            const group4Content = [contact12, contact13, contact14, contact15];
            const group5Content: Contact[] = [];

            expect(group1.contactList).toHaveLength(6);
            expect(group2.contactList).toHaveLength(3);
            expect(group3.contactList).toHaveLength(2);
            expect(group4.contactList).toHaveLength(4);
            expect(group5.contactList).toHaveLength(0);

            expect(group1.contactList).toEqual(group1Content);
            expect(group2.contactList).toEqual(group2Content);
            expect(group3.contactList).toEqual(group3Content);
            expect(group4.contactList).toEqual(group4Content);
            expect(group5.contactList).toEqual(group5Content);
        });

    describe("to groups", () => {
        describe("and by mistake", () => {
            test("adds same contact twice to one group that causes error", () => {
                expect(() => group1.addContact(contact2)).toThrowError("This contact does exists in this group.");
            });

            test("adds two contacts to group that it should not be added and removes them", () => {
                group2.addContact(contact14);
                group3.addContact(contact15);

                expect(group2.contactList.includes(contact14)).toBeTruthy();
                expect(group3.contactList.includes(contact15)).toBeTruthy();

                group2.deleteContact(contact14);
                group3.deleteContact(contact15);

                expect(group2.contactList.includes(contact14)).toBeFalsy();
                expect(group3.contactList.includes(contact15)).toBeFalsy();
            });
        });
    });
});

describe("In a while user decides to delete contacts from addressBook", () => {
    test("and deletes three contacts", () => {
        const properResult = addressBook.contactList.length;

        addressBook.deleteContact(contact2);
        addressBook.deleteContact(contact5);
        addressBook.deleteContact(contact12);

        expect(addressBook.contactList).toHaveLength(properResult - 3);
    });

    test("by accident user tried to delete contact that does not exist that causes error", () => {
        const contact16 = new Contact("Magda", "Mołek", "magda.molek@mail.com");

        expect(() => addressBook.deleteContact(contact16)).toThrowError("This contact does not exists in this address book.");
    });
});