export interface ICompany {
  companyId: number;
  companyName: string;
  websiteUri: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ICompanyData {
  getCompanies: ICompany[];
  getCompany: ICompany;
}

export interface ICompanyFormProps {
  open: boolean;
  onToggleModal: any;
  refetchQueries: any;
  company?: ICompany;
}
