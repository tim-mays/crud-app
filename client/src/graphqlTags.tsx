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
