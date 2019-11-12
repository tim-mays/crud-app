import { IPerson } from 'interfaces/personInterface';

export default class Person implements IPerson {
  personId!: number;
  companyId!: number;
  firstName!: string;
  lastName!: string;
  emailAddress!: string;
  streetAddress!: string;
  city!: string;
  state!: string;
  zipCode!: string;
}
