import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { COMPANIES_QUERY } from 'graphqlTags';
import { ICompanyData } from 'interfaces/companyInterface';
import { Button, Container } from 'reactstrap';
import TitleBar from 'components/titleBar';
import CompanyTable from 'components/companyTable';
import CompanyForm from 'components/companyForm';

const Companies: React.FC = () => {
  const { loading, data } = useQuery<ICompanyData>(COMPANIES_QUERY);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const button = (
    <Button color="success" onClick={toggleModal}>
      Add Company
    </Button>
  );
  return (
    <Container className="pt-5">
      <TitleBar title="All Companies" button={button}></TitleBar>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Fragment>
          {data && data.getCompanies ? (
            <CompanyTable companies={data.getCompanies} />
          ) : null}

          <CompanyForm
            open={showModal}
            onToggleModal={toggleModal}
            refetchQueries={['companies']}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default Companies;
