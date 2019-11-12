import gql from 'graphql-tag';

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePerson(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $companyId: Int
  ) {
    createPerson(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
      companyId: $companyId
    ) {
      personId
    }
  }
`;

export const EDIT_PERSON_MUTATION = gql`
  mutation EditPerson(
    $personId: Int!
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $companyId: Int
  ) {
    updatePerson(
      personId: $personId
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
      companyId: $companyId
    ) {
      personId
    }
  }
`;

export const COMPANIES_QUERY = gql`
  query companies {
    getCompanies {
      companyId
      companyName
      websiteUri
      phoneNumber
      streetAddress
      city
      state
      zipCode
    }
  }
`;

export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany(
    $companyName: String!
    $websiteUri: String!
    $phoneNumber: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    createCompany(
      companyName: $companyName
      websiteUri: $websiteUri
      phoneNumber: $phoneNumber
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
    ) {
      companyId
    }
  }
`;

export const EDIT_COMPANY_MUTATION = gql`
  mutation EditCompany(
    $companyId: Int!
    $companyName: String!
    $websiteUri: String!
    $phoneNumber: String!
    $streetAddress: String!
    $city: String!
    $state: String!
    $zipCode: String!
  ) {
    updateCompany(
      companyId: $companyId
      companyName: $companyName
      websiteUri: $websiteUri
      phoneNumber: $phoneNumber
      streetAddress: $streetAddress
      city: $city
      state: $state
      zipCode: $zipCode
    ) {
      companyId
    }
  }
`;
