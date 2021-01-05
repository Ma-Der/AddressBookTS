import { Group } from "../Group";
import { Contact } from "../Contact";

describe("Group tests method behavior", () => {
  const group1 = new Group("Short");
  const group2 = new Group("Middle");
  const group3 = new Group("Tallones");

  const contact1 = new Contact("Jan", "Kowalski", "janko@po.pl");
  const contact2 = new Contact("Marek", "Nowak", "marno@po.pl");
  const contact3 = new Contact("Michał", "Kolski", "miko@po.pl");

  it("modifying Group name", () => {
    group1.modifyGroupName("Even shorter");
    expect(group1.groupName).toEqual("Even shorter");
  });

  it("adding Contact to Group", () => {
    group1.addContact(contact1);
    group1.addContact(contact2);
    group2.addContact(contact1);
    group2.addContact(contact2);
    group2.addContact(contact3);
    group3.addContact(contact3);

    expect(group1.contactList).toEqual([contact1, contact2]);
    expect(group1.contactList).toHaveLength(2);
    expect(group2.contactList).toEqual([contact1, contact2, contact3]);
    expect(group2.contactList).toHaveLength(3);
    expect(group3.contactList).toEqual([contact3]);
    expect(group3.contactList).toHaveLength(1);
  });

  it("deleting Contact from Group", () => {
    group1.deleteContact(contact1);
    group2.deleteContact(contact2);
    group3.deleteContact(contact3);

    expect(group1.contactList).toEqual([contact2]);
    expect(group1.contactList).toHaveLength(1);
    expect(group2.contactList).toEqual([contact1, contact3]);
    expect(group2.contactList).toHaveLength(2);
    expect(group3.contactList).toEqual([]);
    expect(group3.contactList).toHaveLength(0);
  });
});

describe("Group tests for errors", () => {
  const group1 = new Group("Short");
  const group2 = new Group("Middle");
  const group3 = new Group("Tallones");

  const contact1 = new Contact("Jan", "Kowalski", "janko@po.pl");
  const contact2 = new Contact("Marek", "Nowak", "marno@po.pl");
  const contact3 = new Contact("Michał", "Kolski", "miko@po.pl");

  it("none arguments in modifying name should throw error", () => {
    () => expect(group2.modifyGroupName()).toThrowError();
  });

  it("wrong argument in modifying name should throw error", () => {
    () => expect(group1.modifyGroupName(555)).toThrowError();
  });

  it("adding contact that already exists in group should throw error", () => {
    group1.addContact(contact1);
    () => expect(group1.addContact(contact1)).toThrowError();
  });

  it("deleting contact that does not exists in group should throw error", () => {
    () => expect(group1.deleteContact(contact3)).toThrowError();
  });
});
