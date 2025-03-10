import React from 'react';
import gql from 'graphql-tag';
import { Alert, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
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
          <p className="text-center">
            Are you sure you want to delete this person?
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

export default ContactDelete;
