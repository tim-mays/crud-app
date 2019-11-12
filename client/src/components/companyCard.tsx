import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ICompanyData } from 'interfaces/companyInterface';
import { Card, CardTitle, CardBody, Container, Row, Col } from 'reactstrap';

interface ICompanyCardProps {
  companyId: number;
}

const CompanyCard: React.FC<ICompanyCardProps> = props => {
  const COMPANY_QUERY = gql`
  query company {
    getCompany(companyId: ${props.companyId}) {
      companyId
      websiteUri
      phoneNumber
      streetAddress
      city
      state
      zipCode
    }
  }`;
  const { loading, data } = useQuery<ICompanyData>(COMPANY_QUERY);
  const companyData = data ? data.getCompany : undefined;
  return (
    <Card body outline color="primary">
      <CardTitle>
        <h4>
          {loading
            ? 'Loading...'
            : `Company Details (ID:${
                companyData ? companyData.companyId : null
              })`}
        </h4>
      </CardTitle>
      <CardBody>
        {loading ? null : (
          <Container>
            <Row>
              <Col>
                <p>
                  <strong>Website:</strong>{' '}
                  {companyData ? companyData.websiteUri : null}
                </p>
                <p>
                  <strong>Phone Number:</strong>{' '}
                  {companyData ? companyData.phoneNumber : null}
                </p>
              </Col>
              <Col className="text-right">
                <p>
                  <strong>Address:</strong>
                </p>
              </Col>
              <Col>
                <div>{companyData ? companyData.streetAddress : null}</div>
                <div>{companyData ? companyData.city : null}</div>
                <div>
                  {companyData ? companyData.state : null},{' '}
                  {companyData ? companyData.zipCode : null}
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </CardBody>
    </Card>
  );
};

export default CompanyCard;
