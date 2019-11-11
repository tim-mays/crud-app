import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface ICompanySelect {
  onChange: any;
  defaultValue?: number;
}

interface ICompany {
  companyId: number;
  companyName: string;
}

interface CompanyData {
  getCompanies: ICompany[];
}

const COMPANIES_QUERY = gql`
  query companies {
    getCompanies {
      companyId
      companyName
    }
  }
`;

const CompanySelect: React.FC<ICompanySelect> = props => {
  const { loading, data } = useQuery<CompanyData>(COMPANIES_QUERY);
  return (
    <FormGroup>
      <Label for="company">Company (Optional)</Label>
      {loading ? (
        <Input type="text" disabled placeholder="Loading Options..." />
      ) : (
        <Input
          type="select"
          name="company"
          id="company"
          onChange={props.onChange}
          defaultValue={props.defaultValue}
        >
          <option value="-1">None</option>
          {data &&
            data.getCompanies.map(company => (
              <option key={company.companyId} value={company.companyId}>
                {company.companyName}
              </option>
            ))}
        </Input>
      )}
    </FormGroup>
  );
};

export default CompanySelect;
