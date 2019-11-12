import { ICompany } from 'interfaces/companyInterface';

class Company implements ICompany {
  companyId!: number;
  companyName!: string;
  websiteUri!: string;
  phoneNumber!: string;
  streetAddress!: string;
  city!: string;
  state!: string;
  zipCode!: string;
}

export default Company;
