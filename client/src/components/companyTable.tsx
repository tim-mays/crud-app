import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ICompany } from 'interfaces/companyInterface';
import { Table, Button } from 'reactstrap';
import CompanyForm from 'components/companyForm';
import CompanyDelete from 'components/companyDelete';

interface ICompanyTableProps {
  companies: ICompany[];
}

const CompanyTable: React.FC<ICompanyTableProps> = props => {
  const [editCompany, setEditCompany] = useState();
  const [deleteCompanyId, setDeleteCompanyId] = useState();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [showDeleteModal, setShowDeleteModal] = useState();
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleEdit = (company: ICompany) => {
    setEditCompany(company);
    toggleModal();
  };

  const handleDelete = (company: ICompany) => {
    setDeleteCompanyId(company.companyId);
    setShowDeleteModal(true);
  };

  return (
    <Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Website</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.companies &&
            props.companies.map(company => (
              <tr key={company.companyId}>
                <td>{company.companyName}</td>
                <td>
                  <a
                    href={company.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.websiteUri}
                  </a>
                </td>
                <td>{company.phoneNumber}</td>
                <td>
                  <Link
                    to={`contacts/${company.companyName}?id=${company.companyId}`}
                  >
                    View Contacts
                  </Link>
                  <Button
                    color="primary"
                    className="ml-3"
                    onClick={() => handleEdit(company)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    color="danger"
                    onClick={() => handleDelete(company)}
                    outline
                    className="ml-3"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CompanyForm
        open={showModal}
        onToggleModal={toggleModal}
        refetchQueries={['companies']}
        company={editCompany}
      />

      <CompanyDelete
        open={showDeleteModal}
        companyId={deleteCompanyId}
        refetchQueries={['companies']}
        onToggleModal={toggleDeleteModal}
      />
    </Fragment>
  );
};

export default CompanyTable;
