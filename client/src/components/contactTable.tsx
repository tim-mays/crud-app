import React, { Fragment, useState } from 'react';
import { Table, Button } from 'reactstrap';
import ContactForm from 'components/contactForm';

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
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const handleEdit = (person: IPerson) => {
    setEditPerson(person);
    toggleModal();
  };

  const handleDelete = (event: any) => {};

  return (
    <Fragment>
      <Table striped>
        <thead>
          <tr>
            <th>Company ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.people &&
            props.people.map(person => (
              <tr key={person.personId}>
                <td>{person.companyId}</td>
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
                    onClick={handleDelete}
                    outline
                    className="mt-3"
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
    </Fragment>
  );
};

export default ContactTable;
