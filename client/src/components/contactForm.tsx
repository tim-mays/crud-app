import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_PERSON_MUTATION, EDIT_PERSON_MUTATION } from 'graphqlTags';
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import CompanySelect from 'components/companySelect';
import StateSelect from 'components/stateSelect';

interface IContactForm {
  open: boolean;
  onToggleModal: any;
  refetchQueries: any;
  person?: IPerson;
}

interface IPerson {
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

class Person implements IPerson {
  personId!: number;
  companyId!: number;
  firstName!: string;
  lastName!: string;
  emailAddress!: string;
  streetAddress!: string;
  city!: string;
  state!: string;
  zipCode!: string;
}

const ContactForm: React.FC<IContactForm> = props => {
  const [person, setPerson] = useState(new Person());

  const [firstNameIsInvalid, setFirstNameIsInvalid] = useState();
  const [lastNameIsInvalid, setLastNameIsInvalid] = useState();
  const [emailAddressIsInvalid, setEmailAddressIsInvalid] = useState();
  const [streetAddressIsInvalid, setStreetAddressIsInvalid] = useState();
  const [cityIsInvalid, setCityIsInvalid] = useState();
  const [stateIsInvalid, setStateIsInvalid] = useState();
  const [zipCodeIsInvalid, setZipCodIsInvalid] = useState();

  useEffect(() => {
    if (props.person) {
      setPerson({ ...props.person });
    }
  }, [props.person]);

  const [createPerson] = useMutation(CREATE_PERSON_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const [editPerson] = useMutation(EDIT_PERSON_MUTATION, {
    onCompleted: data => {
      props.onToggleModal();
    },
    refetchQueries: props.refetchQueries
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      if (person.personId) {
        editPerson({
          variables: {
            ...person
          }
        });
      } else {
        createPerson({
          variables: {
            ...person
          }
        });
        setPerson(new Person());
      }
    }
  };

  const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateForm = () => {
    setFirstNameIsInvalid(!validateField(person.firstName, 1, 50));
    setLastNameIsInvalid(!validateField(person.lastName, 1, 50));
    setEmailAddressIsInvalid(
      !validateField(person.emailAddress, 1, 50, EMAIL_PATTERN)
    );
    setStreetAddressIsInvalid(!validateField(person.streetAddress, 1, 50));
    setCityIsInvalid(!validateField(person.city, 1, 50));
    setStateIsInvalid(!validateField(person.state, 2, 2));
    setZipCodIsInvalid(!validateField(person.zipCode, 5, 5));

    return (
      !firstNameIsInvalid &&
      !lastNameIsInvalid &&
      !emailAddressIsInvalid &&
      !streetAddressIsInvalid &&
      !cityIsInvalid &&
      !stateIsInvalid &&
      !zipCodeIsInvalid
    );
  };

  const validateField = (
    field: string,
    minLength: number,
    maxLength: number,
    regex?: RegExp
  ) => {
    const regexMatch = regex ? regex.test(field) : true;
    return (
      field !== undefined &&
      regexMatch &&
      field.length >= minLength &&
      field.length <= maxLength
    );
  };

  const handleFieldChange = (event: {
    target: { value: string; id: string };
  }) => {
    const value = event.target.value;
    switch (event.target.id) {
      case 'firstName':
        person.firstName = value;
        setFirstNameIsInvalid(!validateField(value, 1, 50));
        break;
      case 'lastName':
        person.lastName = value;
        setLastNameIsInvalid(!validateField(value, 1, 50));
        break;
      case 'emailAddress':
        person.emailAddress = value;
        setEmailAddressIsInvalid(
          !validateField(person.emailAddress, 1, 50, EMAIL_PATTERN)
        );
        break;
      case 'streetAddress':
        person.streetAddress = value;
        setStreetAddressIsInvalid(!validateField(value, 1, 50));
        break;
      case 'city':
        person.city = value;
        setCityIsInvalid(!validateField(value, 1, 50));
        break;
      case 'state':
        person.state = value !== '-1' ? value : '';
        setStateIsInvalid(!validateField(value, 2, 2));
        break;
      case 'zipCode':
        person.zipCode = value;
        setZipCodIsInvalid(!validateField(value, 5, 5));
        break;
      case 'company':
        person.companyId = parseInt(value);
        break;
    }
  };

  const handleToggleModal = () => {
    props.onToggleModal();
    if (props.person && props.person.personId && !validateForm()) {
      setPerson(props.person ? props.person : new Person());
    }
    setFirstNameIsInvalid(false);
    setLastNameIsInvalid(false);
    setEmailAddressIsInvalid(false);
    setStreetAddressIsInvalid(false);
    setCityIsInvalid(false);
    setStateIsInvalid(false);
    setZipCodIsInvalid(false);
  };

  return (
    <Modal isOpen={props.open} toggle={handleToggleModal}>
      <ModalHeader toggle={handleToggleModal}>
        {person && person.personId ? 'Edit ' : 'Create '} A New Contact
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              maxLength={50}
              required
              invalid={firstNameIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.firstName : undefined}
            />
            <FormFeedback>Oops! First Name is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              maxLength={50}
              required
              invalid={lastNameIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.lastName : undefined}
            />
            <FormFeedback>Oops! Last Name is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="emailAddress">Email Address</Label>
            <Input
              type="email"
              name="emailAddress"
              id="emailAddress"
              maxLength={50}
              required
              invalid={emailAddressIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.emailAddress : undefined}
            />
            <FormFeedback>
              Oops! Email Address is missing or is not valid{' '}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Street Address</Label>
            <Input
              type="text"
              name="streetAddress"
              id="streetAddress"
              maxLength={50}
              required
              invalid={streetAddressIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.streetAddress : undefined}
            />
            <FormFeedback>Oops! Street Address is missing</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              maxLength={50}
              required
              invalid={cityIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.city : undefined}
            />
            <FormFeedback>Oops! City is missing</FormFeedback>
          </FormGroup>
          <StateSelect
            onChange={handleFieldChange}
            required
            invalid={stateIsInvalid}
            defaultValue={person ? person.state : undefined}
          />
          <FormGroup>
            <Label for="zipCode">Zip Code</Label>
            <Input
              type="text"
              name="zipCode"
              id="zipCode"
              maxLength={5}
              required
              invalid={zipCodeIsInvalid}
              onChange={handleFieldChange}
              defaultValue={person ? person.zipCode : undefined}
            />
            <FormFeedback>Oops! Zip Code is missing</FormFeedback>
          </FormGroup>
          <CompanySelect
            onChange={handleFieldChange}
            defaultValue={person ? person.companyId : undefined}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Save Contact
        </Button>{' '}
        <Button color="secondary" onClick={handleToggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ContactForm;
