import React from 'react';
import gql from 'graphql-tag';
import { Alert, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';

interface ICompanyDeleteProps {
  companyId: number;
  open: boolean;
  refetchQueries: any;
  onToggleModal: any;
}

const CompanyDelete: React.FC<ICompanyDeleteProps> = props => {
  const DELETE_COMPANY_MUTATION = gql`
    mutation deleteCompany {
      deleteCompany(companyId: ${props.companyId})
    }
  `;

  const [deleteCompany] = useMutation(DELETE_COMPANY_MUTATION, {
    onCompleted: (data: { deleteCompany: boolean }) => {
      if (data.deleteCompany) {
      }
    },
    refetchQueries: props.refetchQueries
  });

  const handleYesClick = () => {
    deleteCompany();
    props.onToggleModal();
  };

  return (
    <Modal isOpen={props.open}>
      <ModalBody>
        <Alert color="danger">
          <p className="text-center">
            Are you sure you want to delete this company?
          </p>
        </Alert>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleYesClick}>
          Yes
        </Button>
        <Button color="danger" onClick={props.onToggleModal} outline>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CompanyDelete;
