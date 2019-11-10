import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface Person {
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

interface PersonData {
  getPeople: Person[];
}

const PEOPLE_QUERY = gql`
  query people {
    getPeople {
      personId
      companyId
      firstName
      lastName
      emailAddress
      streetAddress
      city
      state
      zipCode
    }
  }
`;

const Contacts: React.FC = () => {
  const { loading, data } = useQuery<PersonData>(PEOPLE_QUERY);
  return (
    <div className="home">
      <h2>Aquent Developer Candidate Project - Contacts</h2>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Street Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.getPeople.map(person => (
                <tr key={person.personId}>
                  <td>{person.personId}</td>
                  <td>{person.companyId}</td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>
                    <a href={`mailto:${person.emailAddress}`}>
                      {person.emailAddress}
                    </a>
                  </td>
                  <td>{person.streetAddress}</td>
                  <td>{person.city}</td>
                  <td>{person.state}</td>
                  <td>{person.zipCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contacts;
