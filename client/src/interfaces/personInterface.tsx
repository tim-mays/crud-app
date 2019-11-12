export interface IPerson {
  personId: number;
  companyId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IPersonData {
  getPeople: IPerson[];
}
