import React, { useState, Fragment, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Container } from 'reactstrap';
import TitleBar from 'components/titleBar';
import CompanyCard from 'components/companyCard';
import ContactTable from 'components/contactTable';
import ContactForm from 'components/contactForm';
import { IPersonData } from 'interfaces/personInterface';

const Contacts: React.FC = () => {
  function useLocationQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useLocationQuery();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  let { name } = useParams();

  const [companyId, setCompanyId] = useState();

  useEffect(() => {
    let id = query.get('id');
    setCompanyId(id ? parseInt(id) : undefined);
  }, [query, companyId]);

  const PEOPLE_QUERY = gql`
  query people {
    getPeople(companyId: ${companyId}) {
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
  }`;

  const { loading, data } = useQuery<IPersonData>(PEOPLE_QUERY);

  const button = (
    <Button color="success" onClick={toggleModal}>
      Add Contact
    </Button>
  );
  return (
    <Container className="pt-5">
      <TitleBar title={`${name} - Contacts`} button={button}></TitleBar>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Fragment>
          <CompanyCard companyId={companyId} />
          {data && data.getPeople ? (
            <ContactTable people={data.getPeople} />
          ) : null}

          <ContactForm
            open={showModal}
            onToggleModal={toggleModal}
            refetchQueries={['people']}
            companyId={companyId}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default Contacts;
