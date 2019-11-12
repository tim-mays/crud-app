import React from 'react';
import gql from 'graphql-tag';
import { Alert, Button, Modal, ModalBody } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';

interface IContactDeleteProps {
  personId: number;
  open: boolean;
  refetchQueries: any;
  onToggleModal: any;
}

const ContactDelete: React.FC<IContactDeleteProps> = props => {
  const DELETE_PERSON_MUTATION = gql`
    mutation deletePerson {
      deletePerson(personId: ${props.personId})
    }
  `;

  const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
    onCompleted: (data: { deletePerson: boolean }) => {
      if (data.deletePerson) {
      }
    },
    refetchQueries: props.refetchQueries
  });

  const handleYesClick = () => {
    deletePerson();
    props.onToggleModal();
  };

  return (
    <Modal isOpen={props.open}>
      <ModalBody>
        <Alert color="danger">
          Are you sure?{' '}
          <Button color="danger" className="ml-5" onClick={handleYesClick}>
            Yes
          </Button>
          <Button
            color="danger"
            className="ml-5"
            onClick={props.onToggleModal}
            outline
          >
            Cancel
          </Button>
        </Alert>
      </ModalBody>
    </Modal>
  );
};

export default ContactDelete;
