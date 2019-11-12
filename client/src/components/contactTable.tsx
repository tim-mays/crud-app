import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import ContactForm from 'components/contactForm';
import ContactDelete from 'components/contactDelete';

interface IPerson {
  personId: number;
  companyId?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}
interface IContactTableProps {
  people: IPerson[];
}

const ContactTable: React.FC<IContactTableProps> = props => {
  const [editPerson, setEditPerson] = useState();
  const [deletePersonId, setDeletePersonId] = useState();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [showDeleteModal, setShowDeleteModal] = useState();
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleEdit = (person: IPerson) => {
    setEditPerson(person);
    toggleModal();
  };

  const handleDelete = (person: IPerson) => {
    setDeletePersonId(person.personId);
    setShowDeleteModal(true);
  };

  return (
    <Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>
              <Link to="/">Back To Company List</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.people &&
            props.people.map(person => (
              <tr key={person.personId}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>
                  <a href={`mailto:${person.emailAddress}`}>
                    {person.emailAddress}
                  </a>
                </td>
                <td>{person.streetAddress}</td>
                <td>{person.city}</td>
                <td>{person.state}</td>
                <td>{person.zipCode}</td>
                <td>
                  <Button color="primary" onClick={() => handleEdit(person)}>
                    Edit
                  </Button>{' '}
                  <Button
                    color="danger"
                    className="ml-3"
                    onClick={() => handleDelete(person)}
                    outline
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ContactForm
        open={showModal}
        onToggleModal={toggleModal}
        refetchQueries={['people']}
        person={editPerson}
      />
      <ContactDelete
        open={showDeleteModal}
        personId={deletePersonId}
        refetchQueries={['people']}
        onToggleModal={toggleDeleteModal}
      />
    </Fragment>
  );
};

export default ContactTable;
