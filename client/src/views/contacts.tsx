import React, { useState, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Container } from 'reactstrap';
import TitleBar from 'components/titleBar';
import ContactTable from 'components/contactTable';
import ContactForm from 'components/contactForm';

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
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const { loading, data } = useQuery<PersonData>(PEOPLE_QUERY);
  const button = (
    <Button color="success" onClick={toggleModal}>
      Add Contact
    </Button>
  );
  return (
    <Container>
      <TitleBar
        title="Aquent Developer Candidate Project - Contacts"
        button={button}
      ></TitleBar>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Fragment>
          {data && data.getPeople ? (
            <ContactTable people={data.getPeople} />
          ) : null}

          <ContactForm
            open={showModal}
            onToggleModal={toggleModal}
            refetchQueries={['people']}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default Contacts;
