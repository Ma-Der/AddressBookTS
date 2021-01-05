import { Contact } from "../Contact";

describe("Contact tests method ", () => {
  const contact1 = new Contact("Jan", "Kowalski", "janko@po.pl");
  const contact2 = new Contact("Marek", "Nowak", "marno@po.pl");
  const contact3 = new Contact("Michał", "Kolski", "miko@po.pl");

  it("modifying name", () => {
    contact1.modifyName("Bartosz");
    expect(contact1.name).toEqual("Bartosz");
  });

  it("modyfing surname", () => {
    contact2.modifySurname("Bąk");
    expect(contact2.surname).toEqual("Bąk");
  });

  it("modyfing email", () => {
    contact3.modifyEmail("komik@op.pl");
    expect(contact3.email).toEqual("komik@op.pl");
  });

  it("containPhrase", () => {
    expect(contact1.containPhrase("kowal")).toBeTruthy();
    expect(contact1.containPhrase("lan")).toBeFalsy();
  });
});

describe("Contact tests for errors", () => {
  const contact1 = new Contact("Jan", "Kowalski", "janko@po.pl");
  const contact2 = new Contact("Marek", "Nowak", "marno@po.pl");
  const contact3 = new Contact("Michał", "Kolski", "miko@po.pl");

  it("wrong arguments", () => {
    () => expect(contact1.modifyName(["asd"])).toThrowError();
    () => expect(contact2.modifySurname(345)).toThrowError();
    () => expect(contact3.modifyEmail({ dsd: 23 })).toThrowError();
  });

  it("wrong email in modyfing email", () => {
    () => expect(contact1.modifyEmail("dsasdsadsfsaf5434.plpl")).toThrowError();
  });

  it("none arguments passed", () => {
    () => expect(contact1.modifyName()).toThrowError();
    () => expect(contact2.modifySurname()).toThrowError();
    () => expect(contact3.modifyEmail()).toThrowError();
  });
});
