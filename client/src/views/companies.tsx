import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Company {
  companyId: number;
  companyName: string;
  websiteURI: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CompanyData {
  getCompanies: Company[];
}

const COMPANIES_QUERY = gql`
  query companies {
    getCompanies {
      companyId
      companyName
      websiteURI
      phoneNumber
      streetAddress
      city
      state
      zipCode
    }
  }
`;

const Companies: React.FC = () => {
  const { loading, data } = useQuery<CompanyData>(COMPANIES_QUERY);
  return (
    <div className="home">
      <h2>Aquent Developer Candidate Project - Companies</h2>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Website</th>
              <th>Phone Number</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.getCompanies.map(company => (
                <tr key={company.companyId}>
                  <td>{company.companyId}</td>
                  <td>{company.companyName}</td>
                  <td>
                    <a
                      href={company.websiteURI}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.websiteURI}
                    </a>
                  </td>
                  <td>{company.phoneNumber}</td>
                  <td>{company.streetAddress}</td>
                  <td>{company.city}</td>
                  <td>{company.state}</td>
                  <td>{company.zipCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Companies;
